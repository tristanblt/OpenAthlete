import { Event } from '@openathlete/shared';

import { EventDetails } from '../event-details/event-details';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface P {
  open: boolean;
  onClose: () => void;
  event?: Event;
}

export function CalendarEventDetails({ open, onClose, event }: P) {
  return (
    <Dialog onOpenChange={(o) => !o && onClose()} open={open}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {event?.name} <Badge>{event?.type}</Badge>
          </DialogTitle>
        </DialogHeader>
        {event && <EventDetails eventId={event.eventId} />}
      </DialogContent>
    </Dialog>
  );
}
