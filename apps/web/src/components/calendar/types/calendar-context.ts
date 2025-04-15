import { EVENT_TYPE, Event } from '@openathlete/shared';

export type SummaryType = 'planned' | 'done';

export type CalendarContextType = {
  displayedMonth: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  displayedWeeks: Date[][];
  createEvent: (date: Date, type: EVENT_TYPE) => void;
  editEvent: (eventId: Event['eventId']) => void;
  events: Event[];
  openEventDetails: (eventId: Event['eventId']) => void;
  eventDetailsOpened: Event['eventId'] | null;
  summaryType: SummaryType;
  setSummaryType: (type: SummaryType) => void;
  athleteId?: number;
  allowCreate: boolean;
};
