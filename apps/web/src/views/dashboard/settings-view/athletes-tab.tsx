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
import { useGetMyCoachedAthletesQuery } from '@/services/athlete';
import { useNavigate } from 'react-router-dom';

interface P {}

export function AthletesTab({}: P) {
  const { data: athletes } = useGetMyCoachedAthletesQuery();
  const nav = useNavigate();

  return (
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
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
