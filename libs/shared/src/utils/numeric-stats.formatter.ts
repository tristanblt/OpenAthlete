import { DistanceUnit, SpeedUnit } from '../types';

/**
 * Formats a duration value to a human readable format.
 *
 * @param duration The duration value to format (in seconds)
 * @returns The formatted duration value
 */
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  else return `${minutes}:${paddedSeconds}`;
};

/**
 * Formats a speed value to a human readable format.
 *
 * @param speed The speed value to format (in m/s)
 * @param unit The unit to format the speed to
 * @returns The formatted speed value
 */
export const formatSpeed = (
  speed: number,
  unit: SpeedUnit = 'min/km',
): string => {
  switch (unit) {
    case 'm/s':
      return `${speed.toFixed(2)}`;
    case 'km/h':
      return `${(speed * 3.6).toFixed(2)}`;
    case 'mph':
      return `${(speed * 2.23694).toFixed(2)}`;
    case 'min/km':
      if (speed === 0) return '0';
      return formatDuration(1 / (speed / 1000));
    case 'min/mi':
      if (speed === 0) return '0';
      return formatDuration(1 / (speed / 1609.34));
    default:
      return `${speed.toFixed(2)}`;
  }
};

export const formatSpeedUnit = (unit: SpeedUnit): string => {
  switch (unit) {
    case 'm/s':
      return `m/s`;
    case 'km/h':
      return `km/h`;
    case 'mph':
      return `m / h`;
    case 'min/km':
      return 'min/km';
    case 'min/mi':
      return 'min/mi';
  }
};

/**
 * Formats a distance value to a human readable format.
 *
 * @param distance The distance value to format (in meters)
 * @param unit The unit to format the distance to (m, km, mi)
 * @returns The formatted distance value
 */
export const formatDistance = (
  distance: number,
  unit: DistanceUnit = 'km',
): string => {
  switch (unit) {
    case 'm':
      return `${distance.toFixed(0)}`;
    case 'km':
      return `${(distance / 1000).toFixed(2)}`;
    case 'mi':
      return `${(distance / 1609.34).toFixed(2)}`;
    default:
      return `${distance.toFixed(0)}`;
  }
};
