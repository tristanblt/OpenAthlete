import { EVENT_TYPE } from './event-type.enum';

export const eventTypeLabelMap: Record<EVENT_TYPE, string> = {
  [EVENT_TYPE.TRAINING]: 'Training',
  [EVENT_TYPE.COMPETITION]: 'Competition',
  [EVENT_TYPE.NOTE]: 'Note',
  [EVENT_TYPE.ACTIVITY]: 'Activity',
};
