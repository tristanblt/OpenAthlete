import { endOfDay, startOfDay } from '@openathlete/shared';

import { CalendarDay } from './calendar-day';
import { CalendarWeekSummary } from './calendar-week-summary';
import { useCalendarContext } from './hooks/use-calendar-context';

interface P {}

export function CalendarBody({}: P) {
  const { displayedWeeks, events } = useCalendarContext();

  return (
    <div className="w-full border-1 rounded-lg">
      <div className="grid grid-cols-8 border-b-1">
        {displayedWeeks[0].map((day, i) => (
          <div
            key={i}
            className="h-8 flex justify-center items-center text-sm font-semibold [&:not(:last-child)]:border-r-1"
          >
            {new Date(day).toLocaleString('en-US', { weekday: 'short' })}
          </div>
        ))}
        <div className="h-8 flex justify-center items-center text-sm font-semibold [&:not(:last-child)]:border-r-1">
          Summary
        </div>
      </div>
      {displayedWeeks.map((week, i) => (
        <div
          key={i}
          className="grid grid-cols-8 [&:not(:last-child)]:border-b-1"
        >
          {week.map((day, i) => (
            <CalendarDay
              key={i}
              day={day}
              events={events.filter(
                (event) =>
                  event.startDate.toDateString() === day.toDateString(),
              )}
            />
          ))}
          <CalendarWeekSummary
            events={events.filter(
              (event) =>
                event.startDate.getTime() >= startOfDay(week[0]).getTime() &&
                event.startDate.getTime() <= endOfDay(week[6]).getTime(),
            )}
          />
        </div>
      ))}
    </div>
  );
}
