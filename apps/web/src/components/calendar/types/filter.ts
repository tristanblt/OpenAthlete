import { m } from '@/paraglide/messages';

export enum COLORED_BY {
  TYPE = 'TYPE',
  SPORT = 'SPORT',
  RPE = 'RPE',
}

export const coloredByLabelMap: Record<COLORED_BY, string> = {
  [COLORED_BY.TYPE]: m.type(),
  [COLORED_BY.SPORT]: m.sport(),
  [COLORED_BY.RPE]: m.rpe(),
};
