import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/services/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  EVENT_TYPE,
  Event,
  SPORT_TYPE,
  createEventDtoSchema,
  eventTypeLabelMap,
  formatSpeed,
  sportTypeLabelMap,
} from '@openathlete/shared';

import { useCalendarContext } from '../calendar/hooks/use-calendar-context';
import {
  FormProvider,
  RHFDateTimePicker,
  RHFDistance,
  RHFDuration,
  RHFSelect,
  RHFTextField,
} from '../hook-form';
import { RHFElevation } from '../hook-form/rhf-elevation';
import { RHFRpe } from '../hook-form/rhf-rpe';
import { RHFTextarea } from '../hook-form/rhf-textarea';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { SelectItem } from '../ui/select';

type P =
  | {
      open: boolean;
      onClose: () => void;
      date?: Date;
      type?: EVENT_TYPE;
    }
  | {
      open: boolean;
      onClose: () => void;
      event?: Event;
    };

export function CreateEventDialog({ open, onClose, ...rest }: P) {
  const { athleteId } = useCalendarContext();
  const edit = 'event' in rest;
  const create = 'type' in rest && 'date' in rest;
  const startDate = useMemo(() => {
    if (create) {
      if (!rest.date) return undefined;
      const d = new Date(rest.date);
      d.setHours(8);
      d.setMinutes(0);
      d.setSeconds(0);
      return d;
    } else if (edit) {
      return rest.event?.startDate;
    }
  }, [rest]);
  const endDate = useMemo(() => {
    if (create) {
      if (!rest.date) return undefined;
      const d = new Date(rest.date);
      d.setHours(9);
      d.setMinutes(0);
      d.setSeconds(0);
      return d;
    } else if (edit) {
      return rest.event?.endDate;
    }
  }, [rest]);

  const createEventMutation = useCreateEventMutation({
    onSuccess: () => {
      onClose();
      toast.success('Event created successfully');
    },
    onError: () => {
      toast.error('Failed to create event');
    },
  });
  const updateEventMutation = useUpdateEventMutation({
    onSuccess: () => {
      onClose();
      toast.success('Event updated successfully');
    },
    onError: () => {
      toast.error('Failed to update event');
    },
  });

  const methods = useForm<z.infer<typeof createEventDtoSchema>>({
    resolver: zodResolver(createEventDtoSchema, undefined),
    defaultValues: edit
      ? rest.event
      : create
        ? {
            type: rest.type,
            name: '',
            description: '',
            startDate,
            endDate,
          }
        : {},
  });

  const { handleSubmit, setValue, watch } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (create) createEventMutation.mutate({ ...data, athleteId });
    if (edit && rest.event)
      updateEventMutation.mutate({ eventId: rest.event.eventId, body: data });
  });

  const startDateValue = watch('startDate');
  const goalDistanceValue = watch('goalDistance');
  const goalDurationValue = watch('goalDuration');

  if ((create && (!rest.date || !rest.type)) || (edit && !rest.event)) {
    return null;
  }
  const type = create
    ? rest.type || EVENT_TYPE.TRAINING
    : edit
      ? rest.event?.type || EVENT_TYPE.TRAINING
      : EVENT_TYPE.TRAINING;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {edit ? 'Edit' : 'Plan'} a {eventTypeLabelMap[type]}
          </DialogTitle>
        </DialogHeader>
        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className="grid grid-cols-2 gap-6 pt-3"
        >
          <RHFTextField
            name="name"
            type="text"
            placeholder="Morning Run"
            label="Event Name"
            required
          />
          {type === EVENT_TYPE.TRAINING ||
          type === EVENT_TYPE.COMPETITION ||
          type === EVENT_TYPE.ACTIVITY ? (
            <RHFSelect
              name="sport"
              label="Sport"
              required
              placeholder="Select a sport"
            >
              {Object.values(SPORT_TYPE).map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sportTypeLabelMap[sport]}
                </SelectItem>
              ))}
            </RHFSelect>
          ) : (
            <div />
          )}
          {type !== EVENT_TYPE.ACTIVITY && (
            <>
              <RHFDateTimePicker
                name="startDate"
                label="Start Date"
                required
                onChange={(value) => {
                  const start = new Date(value);
                  const end = new Date(start);
                  if (goalDurationValue) {
                    end.setSeconds(start.getSeconds() + goalDurationValue);
                  } else {
                    end.setHours(start.getHours() + 1);
                  }
                  setValue('endDate', end);
                }}
              />
              <RHFDateTimePicker
                name="endDate"
                label="End Date"
                required
                onChange={(value) => {
                  const end = new Date(value);
                  const start = new Date(startDateValue);

                  const duration = end.getTime() - start.getTime();
                  const durationInSeconds = Math.floor(duration / 1000);
                  setValue('goalDuration', durationInSeconds);
                }}
              />
            </>
          )}
          <div className="col-span-2">
            <RHFTextarea
              name="description"
              label="Description"
              className="h-24"
              required={type === EVENT_TYPE.NOTE}
            />
          </div>
          {(type === EVENT_TYPE.TRAINING ||
            type === EVENT_TYPE.COMPETITION) && (
            <>
              <RHFDistance name="goalDistance" label="Goal Distance" />
              <RHFDuration
                name="goalDuration"
                label="Goal Duration"
                onChange={(value) => {
                  const start = new Date(startDateValue);
                  const duration = value || 0;
                  const end = new Date(start);
                  end.setSeconds(start.getSeconds() + duration);
                  setValue('endDate', end);
                }}
              />
              {!!goalDistanceValue && !!goalDurationValue && (
                <div className="text-sm text-gray-500 flex items-center col-span-2">
                  Pace:{' '}
                  {formatSpeed(goalDistanceValue / goalDurationValue, 'min/km')}{' '}
                  /km
                </div>
              )}
              <RHFElevation
                name="goalElevationGain"
                label="Goal Elevation Gain"
              />
              <RHFRpe name="goalRpe" label="Goal RPE" />
            </>
          )}
          {type === EVENT_TYPE.ACTIVITY && (
            <div className="col-span-2">
              <RHFRpe name="rpe" label="RPE" />
            </div>
          )}

          <Button
            type="submit"
            className="w-full col-span-2"
            onClick={onSubmit}
            isLoading={createEventMutation.isPending}
          >
            {edit ? 'Edit' : 'Create'} the {eventTypeLabelMap[type]}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
