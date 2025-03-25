import { useCalendarData } from '@/components/calendar/hooks/use-calendar-data';
import { useMemo, useState } from 'react';

import { EVENT_TYPE, Event } from '@openathlete/shared';

import { CreateEventDialog } from '../create-event-dialog/create-event.dialog';
import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarContext } from './contexts/calendar-context';
import { CalendarContextType } from './types/calendar-context';

interface P {
  events?: Event[];
}

export function Calendar({ events }: P) {
  const calendarData = useCalendarData({ events });
  const [createEventDialog, setCreateEventDialog] = useState<{
    date: Date;
    type: EVENT_TYPE;
  } | null>(null);

  const memoizedValue = useMemo<CalendarContextType>(
    () => ({
      ...calendarData,
      createEvent: (date, type) => {
        setCreateEventDialog({ date, type });
      },
    }),
    [calendarData.displayedMonth, calendarData.events],
  );

  return (
    <div className="flex flex-col gap-3">
      <CalendarContext.Provider value={memoizedValue}>
        <CalendarHeader />
        <CalendarBody />
        <CreateEventDialog
          key={createEventDialog?.date?.toDateString()}
          open={createEventDialog !== null}
          onClose={() => setCreateEventDialog(null)}
          date={createEventDialog?.date}
          type={createEventDialog?.type}
        />
      </CalendarContext.Provider>
    </div>
  );
}
