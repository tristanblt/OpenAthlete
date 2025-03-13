import { useContext } from 'react';

import { CalendarContext } from '../contexts/calendar-context';

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context)
    throw new Error(
      'useCalendarContext context must be use inside CalendarProvider',
    );

  return context;
};
