import { useDeleteEventMutation } from '@/services/event';

import { Event } from '@openathlete/shared';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { useCalendarContext } from './hooks/use-calendar-context';

interface P {
  event: Event;
}

export function CalendarEvent({ event }: P) {
  const { openEventDetails } = useCalendarContext();
  const deleteEventMutation = useDeleteEventMutation();

  return (
    <ContextMenu>
      <button
        className="bg-blue-50 rounded-sm cursor-pointer text-left hover:bg-blue-100 flex flex-col items-start justify-center py-0.5 px-2 overflow-hidden w-full"
        onClick={(e) => {
          openEventDetails(event.eventId);
          e.stopPropagation();
        }}
      >
        <ContextMenuTrigger className="flex-1 w-full">
          <div className="text-sm font-medium whitespace-nowrap">
            {event.name}
          </div>
          <div className="text-xs font-medium">{event.type.toLowerCase()}</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={(e) => {
              deleteEventMutation.mutate(event.eventId);
              e.stopPropagation();
            }}
          >
            Delete<ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          {/* <ContextMenuItem
                onClick={() => createEvent(day, EVENT_TYPE.COMPETITION)}
              >
                Plan a competition<ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => createEvent(day, EVENT_TYPE.NOTE)}>
                Plan a note<ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem> */}
        </ContextMenuContent>
      </button>
    </ContextMenu>
  );
}
