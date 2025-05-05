import { record } from '@openathlete/database';
import { ActivityStream } from '@openathlete/shared';

export const computeRecords = (
  stream: ActivityStream,
): Pick<
  record,
  'distance' | 'duration' | 'start_duration' | 'end_duration'
>[] => {
  const timeStream = stream.time;
  const latlngStream = stream.latlng;

  if (
    !timeStream ||
    !latlngStream ||
    timeStream.length === 0 ||
    latlngStream.length === 0
  ) {
    return [];
  }

  const targetDistances = [
    400, // 400m
    800, // 800m
    1000, // 1000m
    1500, // 1500m
    3000, // 3000m
    5000, // 5000m
    10000, // 10k
    15000, // 15k
    20000, // 20k
    21097.5, // Semi
    42195, // Marathon
    50000, // 50km
    100000, // 100km
  ];

  const cumulativeDistances: number[] = [0];

  for (let i = 1; i < latlngStream.length; i++) {
    const [lat1, lng1] = latlngStream[i - 1];
    const [lat2, lng2] = latlngStream[i];

    const distance = calculateHaversineDistance(lat1, lng1, lat2, lng2);
    cumulativeDistances.push(cumulativeDistances[i - 1] + distance);
  }

  const records: Pick<
    record,
    'distance' | 'duration' | 'start_duration' | 'end_duration'
  >[] = [];

  for (const targetDistance of targetDistances) {
    if (cumulativeDistances[cumulativeDistances.length - 1] < targetDistance) {
      continue;
    }

    let bestTime = Number.MAX_SAFE_INTEGER;
    let bestStart = 0;
    let bestEnd = 0;
    let right = 0;

    for (let left = 0; left < cumulativeDistances.length; left++) {
      while (
        right < cumulativeDistances.length &&
        cumulativeDistances[right] - cumulativeDistances[left] < targetDistance
      ) {
        right++;
      }

      if (right < cumulativeDistances.length) {
        const segmentTime = timeStream[right] - timeStream[left];

        let hasPause = false;
        for (let i = left + 1; i <= right; i++) {
          if (timeStream[i] - timeStream[i - 1] > 5) {
            hasPause = true;
            break;
          }
        }

        if (!hasPause && segmentTime < bestTime) {
          bestTime = segmentTime;
          bestStart = timeStream[left];
          bestEnd = timeStream[right];
        }
      }
    }

    if (bestTime < Number.MAX_SAFE_INTEGER) {
      records.push({
        duration: bestTime,
        distance: targetDistance,
        start_duration: bestStart,
        end_duration: bestEnd,
      });
    }
  }

  return records;
};

function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
