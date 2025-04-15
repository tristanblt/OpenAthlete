import { ConfirmAction } from '@/components/confirm-action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPath } from '@/routes/paths';
import {
  useGetMyCoachedAthletesQuery,
  useRemoveAthleteMutation,
} from '@/services/athlete';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface P {}

export function AthletesTab({}: P) {
  const { data: athletes } = useGetMyCoachedAthletesQuery();
  const nav = useNavigate();
  const [deleteAthleteDialog, setDeleteAthleteDialog] = useState<number | null>(
    null,
  );
  const removeAthleteMutation = useRemoveAthleteMutation();

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
          {athletes?.map((athlete) => (
            <TableRow key={athlete.athleteId}>
              <TableCell>
                {athlete.user?.firstName} {athlete.user?.lastName}
              </TableCell>
              <TableCell>{athlete.user?.email}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() =>
                    nav(
                      getPath(['dashboard', 'calendar']) +
                        `/${athlete.athleteId}`,
                    )
                  }
                >
                  View calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDeleteAthleteDialog(athlete.athleteId);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmAction
        open={!!deleteAthleteDialog}
        onClose={() => setDeleteAthleteDialog(null)}
        onConfirm={() => {
          if (deleteAthleteDialog) {
            removeAthleteMutation.mutate(deleteAthleteDialog);
          }
          setDeleteAthleteDialog(null);
        }}
        title="Delete Athlete"
        message="Are you sure you want to delete this athlete ?"
        isLoading={removeAthleteMutation.isPending}
      />
    </>
  );
}
