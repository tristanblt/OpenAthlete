import { useCalendarData } from '@/components/calendar/hooks/use-calendar-data';
import { useUpdateEventMutation } from '@/services/event';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';

import { EVENT_TYPE, Event } from '@openathlete/shared';

import { CreateEventDialog } from '../create-event-dialog/create-event.dialog';
import { CalendarBody } from './calendar-body';
import { CalendarEventDetailsDialog } from './calendar-event-details.dialog';
import { CalendarHeader } from './calendar-header';
import { CalendarContext } from './contexts/calendar-context';
import { CalendarContextType, SummaryType } from './types/calendar-context';

interface P {
  events?: Event[];
  athleteId?: number;
  allowCreate?: boolean;
}

export function Calendar({ events, athleteId, allowCreate = true }: P) {
  const calendarData = useCalendarData({ events });
  const [eventDetailsOpened, setEventDetailsOpened] = useState<
    Event['eventId'] | null
  >(null);
  const [createEventDialog, setCreateEventDialog] = useState<{
    date: Date;
    type: EVENT_TYPE;
  } | null>(null);
  const [editEventDialog, setEditEventDialog] = useState<
    Event['eventId'] | null
  >(null);
  const [summaryType, setSummaryType] = useState<SummaryType>('planned-done');
  const updateEventMutation = useUpdateEventMutation();

  const memoizedValue = useMemo<CalendarContextType>(
    () => ({
      ...calendarData,
      createEvent: (date, type) => {
        setCreateEventDialog({ date, type });
      },
      openEventDetails: setEventDetailsOpened,
      eventDetailsOpened,
      editEvent: (eventId) => setEditEventDialog(eventId),
      summaryType,
      setSummaryType,
      athleteId,
      allowCreate,
    }),
    [calendarData.displayedMonth, calendarData.events],
  );

  const dndOnDragEnd = (e: DragEndEvent) => {
    if (!e.over?.id) return;
    const day = new Date(e.over?.id);
    const eventId = Number(e.active.id);
    const event = events?.find((evt) => evt.eventId === eventId);
    if (!event) return;
    const startDate = event.startDate;
    const endDate = event.endDate;
    startDate.setDate(day.getDate());
    startDate.setMonth(day.getMonth());
    startDate.setFullYear(day.getFullYear());
    endDate.setDate(day.getDate());
    endDate.setMonth(day.getMonth());
    endDate.setFullYear(day.getFullYear());
    updateEventMutation.mutate({
      eventId: event.eventId,
      body: {
        ...event,
        startDate,
        endDate,
      },
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <div className="flex flex-col gap-3">
      <CalendarContext.Provider value={memoizedValue}>
        <CalendarHeader />
        <DndContext onDragEnd={dndOnDragEnd} sensors={sensors}>
          <CalendarBody />
        </DndContext>
        <CreateEventDialog
          key={createEventDialog?.date?.toDateString()}
          open={createEventDialog !== null}
          onClose={() => setCreateEventDialog(null)}
          date={createEventDialog?.date}
          type={createEventDialog?.type}
        />
        <CreateEventDialog
          key={editEventDialog}
          open={editEventDialog !== null}
          onClose={() => setEditEventDialog(null)}
          event={events?.find((event) => event.eventId === editEventDialog)}
        />
        <CalendarEventDetailsDialog
          open={eventDetailsOpened !== null}
          onClose={() => setEventDetailsOpened(null)}
          event={events?.find((e) => e.eventId === eventDetailsOpened)}
          onEditEvent={() => {
            setEditEventDialog(eventDetailsOpened);
            setEventDetailsOpened(null);
          }}
        />
      </CalendarContext.Provider>
    </div>
  );
}
