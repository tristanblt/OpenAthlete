import { useCalendarData } from '@/components/calendar/hooks/use-calendar-data';
import { useMemo } from 'react';

import { CalendarBody } from './calendar-body';
import { CalendarHeader } from './calendar-header';
import { CalendarContext } from './contexts/calendar-context';
import { CalendarContextType } from './types/calendar-context';

interface P {}

export function Calendar({}: P) {
  const calendarData = useCalendarData({});

  const memoizedValue = useMemo<CalendarContextType>(
    () => ({
      ...calendarData,
    }),
    [calendarData.displayedMonth],
  );

  return (
    <div className="flex flex-col gap-3">
      <CalendarContext.Provider value={memoizedValue}>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContext.Provider>
    </div>
  );
}
