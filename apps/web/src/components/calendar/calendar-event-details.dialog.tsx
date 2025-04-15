import { Event, eventTypeLabelMap } from '@openathlete/shared';

import { EventDetails } from '../event-details/event-details';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface P {
  open: boolean;
  onClose: () => void;
  event?: Event;
  onEditEvent: () => void;
}

export function CalendarEventDetailsDialog({
  open,
  onClose,
  event,
  onEditEvent,
}: P) {
  return (
    <Dialog onOpenChange={(o) => !o && onClose()} open={open}>
      <DialogContent className="sm:max-w-4xl overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-center gap-2">
            <div className="flex items-center gap-2 grow">
              {event?.name}{' '}
              {event && <Badge>{eventTypeLabelMap[event.type]}</Badge>}
            </div>
            <div className="flex items-center gap-2 pr-4 -translate-y-4">
              <Button onClick={onEditEvent} variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        {event && <EventDetails eventId={event.eventId} />}
      </DialogContent>
    </Dialog>
  );
}
