import { cn } from '@/utils/shadcn';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { CalendarEvent } from './calendar-event';
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
      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
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
          <div className="flex-1 p-1 pt-0 grid gap-1 grid-rows-2">
            <CalendarEvent />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            Plan a workout<ContextMenuShortcut>⌘T</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Plan a race<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Plan a note<ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </button>
  );
}
