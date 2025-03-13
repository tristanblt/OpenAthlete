import { Button } from '../ui/button';
import { useCalendarContext } from './hooks/use-calendar-context';

interface P {}

export function CalendarHeader({}: P) {
  const { nextMonth, prevMonth, displayedMonth } = useCalendarContext();

  const displayedMonthString = displayedMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">
        Calendar of {displayedMonthString}
      </h1>
      <div className="flex gap-2">
        <Button onClick={() => prevMonth()}>Prev</Button>
        <Button onClick={() => nextMonth()}>Next</Button>
      </div>
    </div>
  );
}
