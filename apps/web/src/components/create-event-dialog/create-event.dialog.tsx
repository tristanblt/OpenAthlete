import { EventType } from '@openathlete/shared';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface P {
  open: boolean;
  onClose: () => void;
  date?: Date;
  type?: EventType;
}

export function CreateEventDialog({ open, onClose, date, type }: P) {
  if (!date || !type) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan a {type.toLowerCase()}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
