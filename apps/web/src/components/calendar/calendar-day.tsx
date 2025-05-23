import { m } from '@/paraglide/messages';
import { cn } from '@/utils/shadcn';
import { useDroppable } from '@dnd-kit/core';

import { EVENT_TYPE, Event } from '@openathlete/shared';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { CalendarEvent } from './calendar-event';
import { useCalendarContext } from './hooks/use-calendar-context';

interface P {
  day: Date;
  events: Event[];
}

export function CalendarDay({ day, events }: P) {
  const { displayedMonth, createEvent, allowCreate, createEventFromTemplate } =
    useCalendarContext();
  const dayOfMonth = day.getDate();
  const isToday = day.toDateString() === new Date().toDateString();
  const isCurrentMonth = day.getMonth() === displayedMonth.getMonth();
  const { isOver, setNodeRef } = useDroppable({
    id: day.toISOString(),
  });

  return (
    <div
      className={cn(
        'min-h-32 flex flex-col [&:not(:last-child)]:border-r-1 cursor-pointer hover:bg-gray-50',
        isOver ? 'bg-gray-100' : '',
      )}
      onClick={() => console.log(day)}
      ref={setNodeRef}
    >
      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
          <div
            className={cn(
              'flex justify-center p-2 text-sm font-medium text-gray-600',
              {
                'text-red-500 font-bold': isToday,
                'text-gray-400': !isCurrentMonth,
              },
            )}
          >
            <span>{dayOfMonth}</span>
          </div>
          <div className="flex-1 p-1 pb-2 pt-0 flex flex-col gap-1">
            {events
              .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
              .map((event) => (
                <CalendarEvent key={event.eventId} event={event} />
              ))}
          </div>
        </ContextMenuTrigger>
        {allowCreate && (
          <ContextMenuContent className="w-64">
            <ContextMenuItem onClick={() => createEventFromTemplate(day)}>
              {m.set_a_template()}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => createEvent(day, EVENT_TYPE.TRAINING)}
            >
              {m.plan_a_training()}
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => createEvent(day, EVENT_TYPE.COMPETITION)}
            >
              {m.plan_a_competition()}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => createEvent(day, EVENT_TYPE.NOTE)}>
              {m.plan_a_note()}
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </div>
  );
}
