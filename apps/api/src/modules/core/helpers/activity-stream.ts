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
