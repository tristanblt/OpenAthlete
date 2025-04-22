export enum COLORED_BY {
  TYPE = 'TYPE',
  SPORT = 'SPORT',
  RPE = 'RPE',
}

export const coloredByLabelMap: Record<COLORED_BY, string> = {
  [COLORED_BY.TYPE]: 'Type',
  [COLORED_BY.SPORT]: 'Sport',
  [COLORED_BY.RPE]: 'RPE',
};
