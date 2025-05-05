import { m } from '@/paraglide/messages';

import { SPORT_TYPE } from '@openathlete/shared';

export const sportTypeLabelMap: Record<SPORT_TYPE, string> = {
  [SPORT_TYPE.RUNNING]: m.running(),
  [SPORT_TYPE.CYCLING]: m.cycling(),
  [SPORT_TYPE.SWIMMING]: m.swimming(),
  [SPORT_TYPE.TRAIL_RUNNING]: m.trail_running(),
  [SPORT_TYPE.HIKING]: m.hiking(),
  [SPORT_TYPE.ROCK_CLIMBING]: m.rock_climbing(),
  [SPORT_TYPE.OTHER]: m.other(),
};
