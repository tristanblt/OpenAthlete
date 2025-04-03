import { useCreateEventMutation } from '@/services/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  EVENT_TYPE,
  SPORT_TYPE,
  createEventDtoSchema,
  eventTypeLabelMap,
  sportTypeLabelMap,
} from '@openathlete/shared';

import {
  FormProvider,
  RHFDateTimePicker,
  RHFSelect,
  RHFTextField,
} from '../hook-form';
import { RHFTextarea } from '../hook-form/rhf-textarea';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { SelectItem } from '../ui/select';

interface P {
  open: boolean;
  onClose: () => void;
  date?: Date;
  type?: EVENT_TYPE;
}

export function CreateEventDialog({ open, onClose, date, type }: P) {
  const startDate = useMemo(() => {
    if (!date) return undefined;
    const d = new Date(date);
    d.setHours(8);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
  }, [date]);
  const endDate = useMemo(() => {
    if (!date) return undefined;
    const d = new Date(date);
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
  }, [date]);

  const createEventMutation = useCreateEventMutation({
    onSuccess: () => {
      onClose();
      toast.success('Event created successfully');
    },
    onError: () => {
      toast.error('Failed to create event');
    },
  });
  const methods = useForm<z.infer<typeof createEventDtoSchema>>({
    resolver: zodResolver(createEventDtoSchema, undefined),
    defaultValues: {
      type,
      name: '',
      description: '',
      startDate,
      endDate,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    createEventMutation.mutate(data);
  });

  if (!date || !type) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Plan a {eventTypeLabelMap[type]}</DialogTitle>
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
          {type === EVENT_TYPE.TRAINING || type === EVENT_TYPE.COMPETITION ? (
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
          <RHFDateTimePicker name="startDate" label="Start Date" required />
          <RHFDateTimePicker name="endDate" label="End Date" required />
          <div className="col-span-2">
            <RHFTextarea
              name="description"
              label="Description"
              className="h-24"
            />
          </div>
          <Button
            type="submit"
            className="w-full col-span-2"
            onClick={onSubmit}
          >
            Create the {eventTypeLabelMap[type]}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
