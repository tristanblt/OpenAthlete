import { useGetEventStreamQuery } from '@/services/event';

import { ActivityEvent, getActivityDuration } from '@openathlete/shared';

import { HeartrateChart } from '../charts/heartrate-chart';
import { HeartrateDistributionChart } from '../charts/heartrate-distribution-chart';
import { Map } from '../map/map';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ActivityStatistics } from './activity-statistics';

interface P {
  event: ActivityEvent;
}

export function ActivityDetails({ event }: P) {
  const { data: stream } = useGetEventStreamQuery(event.eventId, 3000, [
    'altitude',
    'latlng',
    'heartrate',
  ]);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ActivityStatistics event={event} stream={stream} />
          </div>
        </CardContent>
      </Card>
      {stream?.latlng && (
        <Map
          className="col-span-1 rounded-xl shadow-sm border"
          polyline={stream.latlng}
        />
      )}
      {stream?.heartrate && (
        <>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <HeartrateChart
                heartrateStream={stream.heartrate}
                sport={event.sport}
              />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Heart Rate Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <HeartrateDistributionChart
                heartrateStream={stream.heartrate}
                sport={event.sport}
                duration={getActivityDuration(event)}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
