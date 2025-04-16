import {
  useDeleteEventMutation,
  useDuplicateEventMutation,
} from '@/services/event';
import { cn } from '@/utils/shadcn';
import { useDraggable } from '@dnd-kit/core';
import { useMemo, useState } from 'react';

import {
  EVENT_TYPE,
  Event,
  SPORT_TYPE,
  formatDistance,
  formatDuration,
  getActivityDuration,
} from '@openathlete/shared';

import { ConfirmAction } from '../confirm-action';
import { SportIcon } from '../sport-icon/sport-icon';
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
  wrapped?: boolean;
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
  if (event.type === 'TRAINING' || event.type === 'COMPETITION') {
    return (
      <div className="flex justify-between w-full">
        {event.goalDuration && (
          <div className="text-xs font-medium text-gray-500">
            {formatDuration(event.goalDuration)}
          </div>
        )}
        {event.goalDistance && (
          <div className="text-xs font-medium text-gray-500">
            {formatDistance(event.goalDistance, 'km')} km
          </div>
        )}
      </div>
    );
  }
}

export function CalendarEvent({ event, wrapped }: P) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: event.eventId,
    });
  const {
    openEventDetails,
    editEvent,
    events: allEvents,
  } = useCalendarContext();
  const [deleteEventDialog, setDeleteEventDialog] = useState<boolean>(false);
  const deleteEventMutation = useDeleteEventMutation();
  const duplicateEventMutation = useDuplicateEventMutation();

  const eventColor = useMemo(() => {
    switch (event.type) {
      case 'ACTIVITY':
        return 'bg-green-50 hover:bg-green-100 border-green-200';
      case 'COMPETITION':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'NOTE':
        return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200';
      case 'TRAINING':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
    }
  }, [event.type]);

  const draggable = event.type !== EVENT_TYPE.ACTIVITY && !wrapped;
  const relatedEvents = allEvents.filter(
    (e) =>
      (e.type === EVENT_TYPE.TRAINING || e.type === EVENT_TYPE.COMPETITION) &&
      e.relatedActivity?.eventId === event.eventId,
  );
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="flex-1 w-full">
          <button
            className={cn(
              'rounded-sm cursor-pointer text-left flex flex-col items-start justify-center py-0.5 px-1 overflow-hidden w-full',
              eventColor,
              isDragging ? 'z-50' : '',
              wrapped ? 'border-2' : '',
            )}
            style={{
              transform: draggable
                ? `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`
                : '',
            }}
            {...listeners}
            {...attributes}
            onClick={(e) => {
              openEventDetails(event.eventId);
              e.stopPropagation();
            }}
            ref={draggable ? setNodeRef : undefined}
          >
            <div className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis px-1">
              {event.type !== EVENT_TYPE.NOTE && (
                <SportIcon sport={event.sport} className="inline-block mr-1" />
              )}
              {event.name}
            </div>
            <div className="px-1 w-full">
              <EventSecondLine event={event} />
            </div>
            {relatedEvents.length > 0 && (
              <div className="flex flex-col gap-1 mt-1 w-full mb-0.5">
                {relatedEvents.map((relatedEvent) => (
                  <CalendarEvent
                    key={relatedEvent.eventId}
                    event={relatedEvent}
                    wrapped
                  />
                ))}
              </div>
            )}
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={(e) => {
              editEvent(event.eventId);
              e.stopPropagation();
            }}
          >
            Edit<ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          {event.type !== EVENT_TYPE.ACTIVITY && (
            <ContextMenuItem
              onClick={(e) => {
                duplicateEventMutation.mutate(event.eventId);
                e.stopPropagation();
              }}
            >
              Duplicate<ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
          )}
          <ContextMenuItem
            onClick={(e) => {
              setDeleteEventDialog(true);
              e.stopPropagation();
            }}
          >
            Delete<ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
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
