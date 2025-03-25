import { Event } from '@openathlete/shared';

interface P {
  event: Event;
}

export function CalendarEvent({ event }: P) {
  return (
    <button
      className="bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100 flex flex-col items-start justify-center py-0.5 px-2"
      onClick={() => console.log('event')}
    >
      <div className="text-sm font-medium">{event.name}</div>
      <div className="text-xs font-medium">{event.type.toLowerCase()}</div>
    </button>
  );
}
