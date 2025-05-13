import { LoadingScreen } from '@/components/loading-screen';
import { TrainingZoneForm } from '@/components/training-zone-form/training-zone-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetMyAthleteQuery } from '@/services/athlete';
import {
  useCreateTrainingZone,
  useDeleteTrainingZone,
  useUpdateTrainingZone,
} from '@/services/training-zone';
import { sportTypeLabelMap } from '@/utils/label-map/core';
import { useState } from 'react';

import { SPORT_TYPE } from '@openathlete/shared';

export function TrainingZonesTab() {
  const { data: athlete, isLoading: athleteLoading } = useGetMyAthleteQuery();
  const athleteId = athlete?.athleteId;

  const createZone = useCreateTrainingZone();
  const updateZone = useUpdateTrainingZone();
  const deleteZone = useDeleteTrainingZone();

  const [editZone, setEditZone] = useState<any | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  if (athleteLoading || !athlete || !athleteId) return <LoadingScreen />;
  const zones = athlete.trainingZones;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Training Zones</h2>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add Zone</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Training Zone</DialogTitle>
            </DialogHeader>
            <TrainingZoneForm
              onSubmit={async (values) => {
                await createZone.mutateAsync({ ...values, athleteId });
                setAddOpen(false);
              }}
              isLoading={createZone.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Min</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Sports</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones?.map((zone: any) => (
            <TableRow key={zone.trainingZoneId}>
              <TableCell>{zone.name}</TableCell>
              <TableCell>{zone.description}</TableCell>
              <TableCell>{zone.values[0]?.min}</TableCell>
              <TableCell>{zone.values[0]?.max}</TableCell>
              <TableCell>
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: zone.color }}
                />
              </TableCell>
              <TableCell>
                {zone.values[0]?.sports
                  ?.map((sport: SPORT_TYPE) => sportTypeLabelMap[sport])
                  .join(', ')}
              </TableCell>
              <TableCell>
                <Dialog
                  open={editZone?.trainingZoneId === zone.trainingZoneId}
                  onOpenChange={(open) => setEditZone(open ? zone : null)}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Training Zone</DialogTitle>
                    </DialogHeader>
                    <TrainingZoneForm
                      defaultValues={{
                        name: zone.name,
                        description: zone.description,
                        min: zone.values[0]?.min,
                        max: zone.values[0]?.max,
                        color: zone.color,
                        sports: zone.values[0]?.sports || [],
                      }}
                      onSubmit={async (values) => {
                        await updateZone.mutateAsync({
                          trainingZoneId: zone.trainingZoneId,
                          body: values,
                        });
                        setEditZone(null);
                      }}
                      isLoading={updateZone.isPending}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => deleteZone.mutate(zone.trainingZoneId)}
                  isLoading={deleteZone.isPending}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
