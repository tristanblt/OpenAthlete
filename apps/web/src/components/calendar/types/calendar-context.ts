import { EventType } from '@openathlete/shared';

export type CalendarContextType = {
  displayedMonth: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  displayedWeeks: Date[][];
  createEvent: (date: Date, type: EventType) => void;
};
