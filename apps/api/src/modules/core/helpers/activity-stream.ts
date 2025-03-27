export const compressActivityStream = (
  stream: (number | number[] | boolean)[],
  compression: number,
) => {
  if (compression <= 1) {
    return stream;
  }

  const compressedStream: (number | number[] | boolean)[] = [];

  for (let i = 0; i < stream.length; i += compression) {
    compressedStream.push(stream[i]);
  }

  return compressedStream;
};
