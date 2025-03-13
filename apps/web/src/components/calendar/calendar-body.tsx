import { CalendarDay } from './calendar-day';
import { useCalendarContext } from './hooks/use-calendar-context';

interface P {}

export function CalendarBody({}: P) {
  const { displayedWeeks } = useCalendarContext();

  return (
    <div className="w-full border-1 rounded-lg">
      <div className="grid grid-cols-7 border-b-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-8 flex justify-center items-center text-sm font-semibold [&:not(:last-child)]:border-r-1"
          >
            {new Date(0, 0, i).toLocaleString('en-US', { weekday: 'short' })}
          </div>
        ))}
      </div>
      {displayedWeeks.map((week, i) => (
        <div
          key={i}
          className="grid grid-cols-7 [&:not(:last-child)]:border-b-1"
        >
          {week.map((day, i) => (
            <CalendarDay key={i} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}
