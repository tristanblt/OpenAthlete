import { useGetEventStreamQuery } from '@/services/event';

import { ActivityEvent, getActivityDuration } from '@openathlete/shared';

import { Map } from '../map/map';
import {
  DistanceStat,
  DurationStat,
  ElevationStat,
  HeartrateStat,
  SpeedStat,
} from '../numeric-stats';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface P {
  event: ActivityEvent;
}

export function ActivityDetails({ event }: P) {
  const { data: stream } = useGetEventStreamQuery(event.eventId, 10, [
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
            <DistanceStat label="Distance" distance={event.distance} />
            <SpeedStat label="Average Speed" speed={event.averageSpeed} />
            <DurationStat
              label="Duration"
              duration={getActivityDuration(event)}
              movingDuration={event.movingTime}
            />
            <SpeedStat label="Max Speed" speed={event.maxSpeed} />
            <ElevationStat
              label="Elevation Gain"
              elevation={event.elevationGain}
              altitudeStream={stream?.altitude}
            />
            {event.averageHeartrate && (
              <HeartrateStat
                label="Average Heart Rate"
                heartrate={event.averageHeartrate}
              />
            )}
            {event.maxHeartrate && (
              <HeartrateStat
                label="Max Heart Rate"
                heartrate={event.maxHeartrate}
              />
            )}
          </div>
        </CardContent>
      </Card>
      {stream?.latlng && (
        <Map
          className="col-span-1 rounded-xl shadow-sm border"
          polyline={stream?.latlng}
        />
      )}
    </div>
  );
}
