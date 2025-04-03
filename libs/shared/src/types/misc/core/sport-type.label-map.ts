import { SPORT_TYPE } from './sport-type.enum';

export const sportTypeLabelMap: Record<SPORT_TYPE, string> = {
  [SPORT_TYPE.RUNNING]: 'Running',
  [SPORT_TYPE.CYCLING]: 'Cycling',
  [SPORT_TYPE.SWIMMING]: 'Swimming',
  [SPORT_TYPE.TRAIL_RUNNING]: 'Trail Running',
  [SPORT_TYPE.HIKING]: 'Hiking',
  [SPORT_TYPE.ROCK_CLIMBING]: 'Rock Climbing',
  [SPORT_TYPE.OTHER]: 'Other',
};
