import {
  EventService,
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/services/event';
import {
  useDeleteEventTemplateMutation,
  useGetMyEventTemplatesQuery,
} from '@/services/event-template';
import { Edit, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { EventTemplate } from '@openathlete/shared';

import { useCalendarContext } from '../calendar/hooks/use-calendar-context';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type P = {
  open: boolean;
  onClose: () => void;
  date?: Date;
};

export function TemplateRow({
  template,
  onCreate,
  refetchTemplates,
}: {
  template: EventTemplate;
  onCreate: () => void;
  refetchTemplates: () => void;
}) {
  const deleteTemplateMutation = useDeleteEventTemplateMutation();
  const [updateTemplate, setUpdateTemplate] = useState(false);
  const [name, setName] = useState(template.event?.name);
  const updateEventMutation = useUpdateEventMutation({
    onSuccess: () => {
      setUpdateTemplate(false);
      refetchTemplates();
    },
  });

  if (!template.event) return null;
  return (
    <TableRow key={template.eventTemplateId}>
      <TableCell>
        {updateTemplate ? (
          <div className="flex gap-1">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button
              isLoading={updateEventMutation.isPending}
              onClick={() =>
                updateEventMutation.mutate({
                  eventId: template.eventId,
                  body: { name },
                })
              }
            >
              Validate
            </Button>
            <Button onClick={() => setUpdateTemplate(false)} variant="outline">
              Cancel
            </Button>
          </div>
        ) : (
          template.event?.name
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-1 justify-end">
          <Button variant="outline" onClick={onCreate}>
            Use
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setUpdateTemplate(true)}
          >
            <Edit />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              deleteTemplateMutation.mutate(template.eventTemplateId)
            }
          >
            <Trash />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
export function CreateEventFromTemplateDialog({ open, onClose, ...rest }: P) {
  const { athleteId } = useCalendarContext();
  const { data: templates, refetch } = useGetMyEventTemplatesQuery();
  const startDate = useMemo(() => {
    if (!rest.date) return undefined;
    const d = new Date(rest.date);
    d.setHours(8);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
  }, [rest]);
  const endDate = useMemo(() => {
    if (!rest.date) return undefined;
    const d = new Date(rest.date);
    d.setHours(9);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
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

  if (!rest.date) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select a template</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates?.map((template) => (
              <TemplateRow
                template={template}
                refetchTemplates={refetch}
                onCreate={async () => {
                  if (!startDate || !endDate) return;
                  const event = await EventService.getEvent(template.eventId);
                  createEventMutation.mutate({
                    ...event,
                    startDate,
                    endDate,
                    athleteId,
                  });
                }}
              />
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
