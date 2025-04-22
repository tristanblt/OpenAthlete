import { Dispatch, SetStateAction } from 'react';

import { EVENT_TYPE, Event } from '@openathlete/shared';

export type SummaryType = 'planned' | 'done' | 'planned-done';

export type CalendarContextType = {
  displayedMonth: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  displayedWeeks: Date[][];
  createEvent: (date: Date, type: EVENT_TYPE) => void;
  createEventFromTemplate: (date: Date) => void;
  editEvent: (eventId: Event['eventId']) => void;
  events: Event[];
  openEventDetails: (eventId: Event['eventId']) => void;
  eventDetailsOpened: Event['eventId'] | null;
  summaryType: SummaryType;
  setSummaryType: (type: SummaryType) => void;
  filter: (event: Event) => boolean;
  setFilter: Dispatch<SetStateAction<(event: Event) => boolean>>;
  athleteId?: number;
  allowCreate: boolean;
};
