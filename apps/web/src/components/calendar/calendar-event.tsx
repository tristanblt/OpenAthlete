import { Event } from '@openathlete/shared';

import { useCalendarContext } from './hooks/use-calendar-context';

interface P {
  event: Event;
}

export function CalendarEvent({ event }: P) {
  const { openEventDetails } = useCalendarContext();
  return (
    <button
      className="bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 flex flex-col items-start justify-center py-0.5 px-2 overflow-hidden"
      onClick={(e) => {
        openEventDetails(event.eventId);
        e.stopPropagation();
      }}
    >
      <div className="text-sm font-medium whitespace-nowrap">{event.name}</div>
      <div className="text-xs font-medium">{event.type.toLowerCase()}</div>
    </button>
  );
}
