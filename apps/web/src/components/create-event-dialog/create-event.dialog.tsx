import { useCreateEventMutation } from '@/services/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { EVENT_TYPE, createEventDtoSchema } from '@openathlete/shared';

import { FormProvider, RHFDateTimePicker, RHFTextField } from '../hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

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
    resolver: zodResolver(createEventDtoSchema),
    defaultValues: {
      type,
      name: '',
      startDate,
      endDate,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) =>
    createEventMutation.mutate(data),
  );

  if (!date || !type) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan a {type.toLowerCase()}</DialogTitle>
        </DialogHeader>
        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className="flex flex-col gap-6 pt-3"
        >
          <RHFTextField
            name="name"
            type="text"
            placeholder="Morning Run"
            label="Event Name"
            required
          />
          <RHFDateTimePicker name="startDate" label="Start Date" required />
          <RHFDateTimePicker name="endDate" label="End Date" required />
          <Button type="submit" className="w-full" onClick={onSubmit}>
            Create a {type.toLowerCase()}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
