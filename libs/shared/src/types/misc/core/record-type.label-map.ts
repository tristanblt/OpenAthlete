import { RECORD_TYPE } from './record-type.enum';

export const recordTypeLabelMap: Record<RECORD_TYPE, string> = {
  [RECORD_TYPE.SPEED]: 'Speed',
  [RECORD_TYPE.POWER]: 'Power',
  [RECORD_TYPE.HEARTRATE]: 'Heart Rate',
  [RECORD_TYPE.ELEVATION_GAIN]: 'Elevation Gain',
  [RECORD_TYPE.ELEVATION_LOSS]: 'Elevation Loss',
  [RECORD_TYPE.CADENCE]: 'Cadence',
};
