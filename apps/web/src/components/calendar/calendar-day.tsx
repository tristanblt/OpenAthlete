import { cn } from '@/utils/shadcn';

import { EVENT_TYPE, Event } from '@openathlete/shared';

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
  events: Event[];
}

export function CalendarDay({ day, events }: P) {
  const { displayedMonth, createEvent } = useCalendarContext();
  const dayOfMonth = day.getDate();
  const isToday = day.toDateString() === new Date().toDateString();
  const isCurrentMonth = day.getMonth() === displayedMonth.getMonth();

  return (
    <div
      className="h-32 flex flex-col [&:not(:last-child)]:border-r-1 cursor-pointer hover:bg-gray-50"
      onClick={() => console.log(day)}
    >
      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
          <div
            className={cn(
              'flex justify-center px-2 py-2 text-sm font-medium text-gray-600',
              {
                'text-red-500 font-bold': isToday,
                'text-gray-400': !isCurrentMonth,
              },
            )}
          >
            <span>{dayOfMonth}</span>
          </div>
          <div className="flex-1 p-1 pt-0 grid gap-1 grid-rows-2">
            {events.map((event) => (
              <CalendarEvent key={event.eventId} event={event} />
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem
            onClick={() => createEvent(day, EVENT_TYPE.TRAINING)}
          >
            Plan a training<ContextMenuShortcut>⌘T</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => createEvent(day, EVENT_TYPE.COMPETITION)}
          >
            Plan a competition<ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => createEvent(day, EVENT_TYPE.NOTE)}>
            Plan a note<ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
