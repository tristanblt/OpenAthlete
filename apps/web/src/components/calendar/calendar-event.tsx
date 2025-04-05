import { useDeleteEventMutation } from '@/services/event';
import { cn } from '@/utils/shadcn';
import { useMemo, useState } from 'react';

import {
  Event,
  SPORT_TYPE,
  formatDistance,
  formatDuration,
  getActivityDuration,
} from '@openathlete/shared';

import { ConfirmAction } from '../confirm-action';
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

function EventSecondLine({ event }: { event: Event }) {
  if (event.type === 'ACTIVITY') {
    if (
      event.sport === SPORT_TYPE.RUNNING ||
      event.sport === SPORT_TYPE.CYCLING ||
      event.sport === SPORT_TYPE.TRAIL_RUNNING ||
      event.sport === SPORT_TYPE.SWIMMING ||
      event.sport === SPORT_TYPE.HIKING
    ) {
      return (
        <div className="flex justify-between w-full">
          <div className="text-xs font-medium text-gray-500">
            {formatDuration(getActivityDuration(event))}
          </div>
          <div className="text-xs font-medium text-gray-500">
            {formatDistance(event.distance, 'km')} km
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between w-full">
          <div className="text-xs font-medium text-gray-500">
            {formatDuration(getActivityDuration(event))}
          </div>
        </div>
      );
    }
  }
}

export function CalendarEvent({ event }: P) {
  const { openEventDetails, editEvent } = useCalendarContext();
  const [deleteEventDialog, setDeleteEventDialog] = useState<boolean>(false);
  const deleteEventMutation = useDeleteEventMutation();

  const eventColor = useMemo(() => {
    switch (event.type) {
      case 'ACTIVITY':
        return 'bg-green-50 hover:bg-green-100';
      case 'COMPETITION':
        return 'bg-red-50 hover:bg-red-100';
      case 'NOTE':
        return 'bg-yellow-50 hover:bg-yellow-100';
      case 'TRAINING':
        return 'bg-blue-50 hover:bg-blue-100';
    }
  }, [event.type]);

  return (
    <>
      <ContextMenu>
        <button
          className={cn(
            'rounded-sm cursor-pointer text-left flex flex-col items-start justify-center py-0.5 px-2 overflow-hidden w-full',
            eventColor,
          )}
          onClick={(e) => {
            openEventDetails(event.eventId);
            e.stopPropagation();
          }}
        >
          <ContextMenuTrigger className="flex-1 w-full">
            <div className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {event.name}
            </div>
            <EventSecondLine event={event} />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={(e) => {
                // deleteEventMutation.mutate(event.eventId);
                setDeleteEventDialog(true);
                e.stopPropagation();
              }}
            >
              Delete<ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => {
                editEvent(event.eventId);
                e.stopPropagation();
              }}
            >
              Edit<ContextMenuShortcut>⌘E</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </button>
      </ContextMenu>
      <ConfirmAction
        open={deleteEventDialog}
        onClose={() => setDeleteEventDialog(false)}
        onConfirm={() => {
          deleteEventMutation.mutate(event.eventId);
          setDeleteEventDialog(false);
        }}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        isLoading={deleteEventMutation.isPending}
      />
    </>
  );
}
