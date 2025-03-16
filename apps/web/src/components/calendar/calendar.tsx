import { useCalendarData } from '@/components/calendar/hooks/use-calendar-data';
import { useMemo, useState } from 'react';

import { EventType } from '@openathlete/shared';

import { CreateEventDialog } from '../create-event-dialog/create-event.dialog';
import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarContext } from './contexts/calendar-context';
import { CalendarContextType } from './types/calendar-context';

interface P {}

export function Calendar({}: P) {
  const calendarData = useCalendarData({});
  const [createEventDialog, setCreateEventDialog] = useState<{
    date: Date;
    type: EventType;
  } | null>(null);

  const memoizedValue = useMemo<CalendarContextType>(
    () => ({
      ...calendarData,
      createEvent: (date, type) => {
        setCreateEventDialog({ date, type });
      },
    }),
    [calendarData.displayedMonth],
  );

  return (
    <div className="flex flex-col gap-3">
      <CalendarContext.Provider value={memoizedValue}>
        <CalendarHeader />
        <CalendarBody />
        <CreateEventDialog
          open={createEventDialog !== null}
          onClose={() => setCreateEventDialog(null)}
          date={createEventDialog?.date}
          type={createEventDialog?.type}
        />
      </CalendarContext.Provider>
    </div>
  );
}
