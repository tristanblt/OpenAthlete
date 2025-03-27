export const findPathCenter = (path: number[][]): number[] => {
  const latitudes = path.map((point) => point[0]);
  const longitudes = path.map((point) => point[1]);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  return [(minLatitude + maxLatitude) / 2, (minLongitude + maxLongitude) / 2];
};

export const findPathZoomLevel = (path: number[][]): number => {
  const latitudes = path.map((point) => point[0]);
  const longitudes = path.map((point) => point[1]);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const latDiff = maxLatitude - minLatitude;
  const lonDiff = maxLongitude - minLongitude;
  const latZoom = Math.floor(Math.log2(360 / latDiff));
  const lonZoom = Math.floor(Math.log2(360 / lonDiff));
  return Math.min(latZoom, lonZoom);
};
