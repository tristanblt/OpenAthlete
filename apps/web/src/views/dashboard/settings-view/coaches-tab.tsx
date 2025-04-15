import { ConfirmAction } from '@/components/confirm-action';
import { InviteCoachDialog } from '@/components/invite-coach-dialog/invite-coach.dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useGetMyCoachesQuery,
  useRemoveCoachMutation,
} from '@/services/athlete';
import { useState } from 'react';

interface P {}

export function CoachesTab({}: P) {
  const { data: coaches } = useGetMyCoachesQuery();
  const [inviteCoachDialogOpen, setInviteCoachDialogOpen] =
    useState<boolean>(false);
  const [deleteCoachDialog, setDeleteEventDialog] = useState<number | null>(
    null,
  );
  const removeCoachMutation = useRemoveCoachMutation();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coaches?.map((coach) => (
            <TableRow key={coach.userId}>
              <TableCell>
                {coach.firstName} {coach.lastName}
              </TableCell>
              <TableCell>{coach.email}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteEventDialog(coach.userId);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() => {
          setInviteCoachDialogOpen(true);
        }}
      >
        Invite a coach
      </Button>
      <InviteCoachDialog
        open={inviteCoachDialogOpen}
        onClose={() => setInviteCoachDialogOpen(false)}
      />
      <ConfirmAction
        open={!!deleteCoachDialog}
        onClose={() => setDeleteEventDialog(null)}
        onConfirm={() => {
          if (deleteCoachDialog) {
            removeCoachMutation.mutate(deleteCoachDialog);
          }
          setDeleteEventDialog(null);
        }}
        title="Delete Coach"
        message="Are you sure you want to delete this coach?"
        isLoading={removeCoachMutation.isPending}
      />
    </>
  );
}
