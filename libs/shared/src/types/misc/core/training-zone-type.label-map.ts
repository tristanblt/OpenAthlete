import { TRAINING_ZONE_TYPE } from './training-zone-type.enum';

export const trainingZoneTypeLabelMap: Record<TRAINING_ZONE_TYPE, string> = {
  [TRAINING_ZONE_TYPE.HEARTRATE]: 'Heart Rate',
  [TRAINING_ZONE_TYPE.POWER]: 'Power',
  [TRAINING_ZONE_TYPE.PACE]: 'Pace',
};
