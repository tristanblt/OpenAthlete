import { RecordsChart } from '@/components/charts/records-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetMyRecordsQuery } from '@/services/record';
import { useState } from 'react';

import { SPORT_TYPE, sportTypeLabelMap } from '@openathlete/shared';

interface P {}

export function RecordsView({}: P) {
  const [sport, setSport] = useState<SPORT_TYPE | ''>('');
  const { data: records, refetch } = useGetMyRecordsQuery(
    sport || (undefined as SPORT_TYPE | undefined),
  );

  const handleChangeSportFilter = (value: string | null) => {
    setSport(value as SPORT_TYPE);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <div className="p-8 grid grid-cols-2 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>My Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sport} onValueChange={handleChangeSportFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null!}>All Sports</SelectItem>
              {Object.values(SPORT_TYPE).map((sportType) => (
                <SelectItem key={sportType} value={sportType}>
                  {sportTypeLabelMap[sportType]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardContent>
          {records && !!records.length && <RecordsChart records={records} />}
          {!records?.length && (
            <h1 className="text-2xl font-semibold">
              No records found for this sport
            </h1>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
