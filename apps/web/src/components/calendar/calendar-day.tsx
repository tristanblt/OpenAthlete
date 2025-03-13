import { cn } from '@/utils/shadcn';

import { useCalendarContext } from './hooks/use-calendar-context';

interface P {
  day: Date;
}

export function CalendarDay({ day }: P) {
  const { displayedMonth } = useCalendarContext();
  const dayOfMonth = day.getDate();
  const isToday = day.toDateString() === new Date().toDateString();
  const isCurrentMonth = day.getMonth() === displayedMonth.getMonth();
  return (
    <button
      className="h-32 flex flex-col [&:not(:last-child)]:border-r-1 cursor-pointer hover:bg-gray-50"
      onClick={() => console.log(day)}
    >
      <div
        className={cn(
          'flex justify-center px-2 py-2 text-sm font-medium text-gray-600',
          {
            'text-red-500': isToday,
            'font-bold': isToday,
            'text-gray-400': !isCurrentMonth,
          },
        )}
      >
        <span>{dayOfMonth}</span>
      </div>
    </button>
  );
}
