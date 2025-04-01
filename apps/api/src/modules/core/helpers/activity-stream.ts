import {
  ActivityStream,
  CompressedActivityStream,
  CompressedActivityStreamUnit,
} from '@openathlete/shared';

export const reductActivityStreamToResolution = (
  stream: (number | number[] | boolean)[],
  resolution: number,
) => {
  if (resolution >= stream.length) {
    return stream;
  }

  const compression = stream.length / resolution;

  const compressedStream: (number | number[] | boolean)[] = [];

  for (let i = 0; i < stream.length; i += compression) {
    compressedStream.push(stream[Math.floor(i)]);
  }

  return compressedStream;
};

const checkEqual = (a: number | number[], b: number | number[]) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((v, i) => v === b[i]);
  }
  return a === b;
};

const CHANGE_TO_OBJECT = 3;

const pushToCompressed = (
  compressed: CompressedActivityStreamUnit[],
  previous: number | number[],
  repeatCount: number,
  incrCount: number,
) => {
  if (repeatCount === 1 && incrCount === 1) {
    compressed.push(previous || 0);
  } else if (repeatCount > 1) {
    if (repeatCount <= CHANGE_TO_OBJECT) {
      for (let j = 0; j < repeatCount; j++) {
        compressed.push(previous || 0);
      }
    } else {
      compressed.push({ r: repeatCount, v: previous || 0 });
    }
    repeatCount = 1;
  } else if (incrCount > 1 && typeof previous === 'number') {
    if (incrCount <= CHANGE_TO_OBJECT) {
      for (let j = 0; j < incrCount; j++) {
        compressed.push(previous - incrCount + j + 1);
      }
    } else {
      compressed.push({ s: (previous || 0) - incrCount + 1, i: incrCount });
    }
    incrCount = 1;
  }
  return { compressed, repeatCount, incrCount };
};

export const compressStream = (
  stream: (number | number[])[],
): CompressedActivityStreamUnit[] => {
  let compressed: CompressedActivityStreamUnit[] = [];
  let repeatCount = 1;
  let incrCount = 1;
  let previous = stream[0];

  for (let i = 1; i < stream.length; i++) {
    const current = stream[i];
    if (checkEqual(previous, current) && incrCount === 1) {
      repeatCount++;
    } else if (
      typeof current === 'number' &&
      typeof previous === 'number' &&
      current === previous + 1 &&
      repeatCount === 1
    ) {
      incrCount++;
    } else {
      const result = pushToCompressed(
        compressed,
        previous,
        repeatCount,
        incrCount,
      );
      compressed = result.compressed;
      repeatCount = result.repeatCount;
      incrCount = result.incrCount;
    }
    previous = current;
  }
  const result = pushToCompressed(compressed, previous, repeatCount, incrCount);
  compressed = result.compressed;
  return compressed;
};

export const uncompressStream = (
  stream: CompressedActivityStreamUnit[],
): (number | number[])[] => {
  const uncompressed: (number | number[])[] = [];

  for (const iter of stream) {
    if (typeof iter === 'number' || Array.isArray(iter)) {
      uncompressed.push(iter);
    } else {
      if ('r' in iter && 'v' in iter) {
        for (let i = 0; i < iter.r; i++) {
          uncompressed.push(iter.v);
        }
      } else if ('s' in iter && 'i' in iter) {
        for (let i = 0; i < iter.i; i++) {
          uncompressed.push(iter.s + i);
        }
      }
    }
  }
  return uncompressed;
};

export const compressActivityStream = (
  stream: ActivityStream,
): CompressedActivityStream => {
  const compressedStream: CompressedActivityStream = {};
  for (const key in stream) {
    if (stream[key] && stream[key].length > 0) {
      compressedStream[key] = compressStream(stream[key]);
    }
  }
  return compressedStream;
};

export const uncompressActivityStream = (
  stream: CompressedActivityStream,
): ActivityStream => {
  const uncompressedStream: ActivityStream = {};
  for (const key in stream) {
    if (stream[key] && stream[key].length > 0) {
      uncompressedStream[key] = uncompressStream(stream[key]);
    }
  }
  return uncompressedStream;
};

export const compareActivityStream = (a: ActivityStream, b: ActivityStream) => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    console.log(`Key length mismatch: ${keysA.length} !== ${keysB.length}`);
    console.log(`Keys A: ${keysA}`);
    console.log(`Keys B: ${keysB}`);
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      console.log(`Key ${key} not found in both streams`);
      return false;
    }

    const streamA = a[key];
    const streamB = b[key];

    if (streamA.length !== streamB.length) {
      console.log(
        `Length mismatch at key ${key}: ${streamA.length} !== ${streamB.length}`,
      );
      return false;
    }

    for (let i = 0; i < streamA.length; i++) {
      if (
        typeof streamA[i] === 'number' &&
        typeof streamB[i] === 'number' &&
        Math.round((streamA[i] || 0) * 100) !==
          Math.round((streamB[i] || 0) * 100)
      ) {
        console.log(JSON.stringify(streamA));
        if (i > 0) {
          console.log(
            `Previous values: ${streamA[i - 1]} !== ${streamB[i - 1]}`,
          );
        }
        console.log(
          `Mismatch at key ${key}, index ${i} / ${streamA.length}: ${streamA[i]} !== ${streamB[i]}`,
        );
        if (i < streamA.length - 1) {
          console.log(`Next values: ${streamA[i + 1]} !== ${streamB[i + 1]}`);
        }

        return false;
      }
      if (
        Array.isArray(streamA[i]) &&
        Array.isArray(streamB[i]) &&
        !streamA[i].every(
          (v, j) => Math.round(v * 100) === Math.round(streamB[i][j] * 100),
        )
      ) {
        console.log(
          `Mismatch at key ${key}, index ${i} / ${streamA.length}: ${streamA[i]} !== ${streamB[i]}`,
        );
        return false;
      }
    }
  }

  return true;
};
