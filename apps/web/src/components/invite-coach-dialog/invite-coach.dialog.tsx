import { useInviteCoachMutation } from '@/services/athlete';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

interface P {
  open: boolean;
  onClose: () => void;
}

export function InviteCoachDialog({ open, onClose }: P) {
  const [email, setEmail] = useState<string>('');
  const inviteCoachMutation = useInviteCoachMutation({
    onSuccess: () => {
      setEmail('');
      onClose();
    },
    onError: () => {
      toast.error(
        'Failed to invite coach. Be sure that the email is an existing user.',
      );
    },
  });

  return (
    <Dialog onOpenChange={(o) => !o && onClose()} open={open}>
      <DialogContent className="sm:max-w-xl overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Invite a coach</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p>To invite a coach, please enter their email address below.</p>
          <Input
            type="email"
            placeholder="Enter coach's email address"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                inviteCoachMutation.mutate({ email });
              }}
            >
              Invite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
