import { m } from '@/paraglide/messages';

import { TRAINING_ZONE_TYPE } from '@openathlete/shared';

export const trainingZoneTypeLabelMap: Record<TRAINING_ZONE_TYPE, string> = {
  [TRAINING_ZONE_TYPE.HEARTRATE]: m.heart_rate(),
  [TRAINING_ZONE_TYPE.POWER]: m.power(),
  [TRAINING_ZONE_TYPE.PACE]: m.pace(),
};
