import { ActivityEvent, ActivityStream, SPORT_TYPE } from '@openathlete/shared';

import {
  DistanceStat,
  DurationStat,
  ElevationStat,
  HeartrateStat,
  SpeedStat,
} from '../numeric-stats';

interface P {
  event: ActivityEvent;
  stream?: Pick<
    ActivityStream,
    'altitude' | 'heartrate' | 'latlng' | 'distance'
  >;
}

export function ActivityStatistics({ event, stream }: P) {
  if (
    event.sport === SPORT_TYPE.RUNNING ||
    event.sport === SPORT_TYPE.TRAIL_RUNNING
  ) {
    return (
      <>
        <DistanceStat label="Distance" distance={event.distance} />
        <SpeedStat label="Average Speed" speed={event.averageSpeed} />
        <DurationStat
          label="Duration"
          duration={event.movingTime}
          movingDuration={event.movingTime}
        />
        <SpeedStat label="Max Speed" speed={event.maxSpeed} />
        <ElevationStat
          label="Elevation Gain"
          elevation={event.elevationGain}
          altitudeStream={stream?.altitude}
          distanceStream={stream?.distance}
        />
        {event.averageHeartrate && (
          <HeartrateStat
            label="Average Heart Rate"
            heartrate={event.averageHeartrate}
            sport={event.sport}
          />
        )}
        {event.maxHeartrate && (
          <HeartrateStat
            label="Max Heart Rate"
            heartrate={event.maxHeartrate}
            sport={event.sport}
          />
        )}
      </>
    );
  } else if (event.sport === SPORT_TYPE.CYCLING) {
    return (
      <>
        <DistanceStat label="Distance" distance={event.distance} />
        <SpeedStat label="Average Speed" speed={event.averageSpeed} />
        <DurationStat
          label="Duration"
          duration={event.movingTime}
          movingDuration={event.movingTime}
        />
        <SpeedStat label="Max Speed" speed={event.maxSpeed} />
        <ElevationStat
          label="Elevation Gain"
          elevation={event.elevationGain}
          altitudeStream={stream?.altitude}
          distanceStream={stream?.distance}
        />
        {event.averageHeartrate && (
          <HeartrateStat
            label="Average Heart Rate"
            heartrate={event.averageHeartrate}
            sport={event.sport}
          />
        )}
        {event.maxHeartrate && (
          <HeartrateStat
            label="Max Heart Rate"
            heartrate={event.maxHeartrate}
            sport={event.sport}
          />
        )}
      </>
    );
  } else if (event.sport === SPORT_TYPE.HIKING) {
    return (
      <>
        <DistanceStat label="Distance" distance={event.distance} />
        <SpeedStat label="Average Speed" speed={event.averageSpeed} />
        <DurationStat
          label="Duration"
          duration={event.movingTime}
          movingDuration={event.movingTime}
        />
        <ElevationStat
          label="Elevation Gain"
          elevation={event.elevationGain}
          altitudeStream={stream?.altitude}
          distanceStream={stream?.distance}
        />
        {event.averageHeartrate && (
          <HeartrateStat
            label="Average Heart Rate"
            heartrate={event.averageHeartrate}
            sport={event.sport}
          />
        )}
        {event.maxHeartrate && (
          <HeartrateStat
            label="Max Heart Rate"
            heartrate={event.maxHeartrate}
            sport={event.sport}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <DurationStat
          label="Duration"
          duration={event.movingTime}
          movingDuration={event.movingTime}
        />
      </>
    );
  }
}
