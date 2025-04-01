import { EVENT_TYPE, Event, getActivityDuration } from '@openathlete/shared';

import { DistanceStat, DurationStat, ElevationStat } from '../numeric-stats';

interface P {
  events: Event[];
}

export function CalendarWeekSummary({ events }: P) {
  const activities = events.filter(
    (event) => event.type === EVENT_TYPE.ACTIVITY,
  );
  const totalDuration = activities.reduce((acc, event) => {
    const duration = getActivityDuration(event);
    return acc + duration;
  }, 0);
  const totalDistance = activities.reduce((acc, event) => {
    return acc + (event.distance || 0);
  }, 0);
  const totalElevation = activities.reduce((acc, event) => {
    return acc + (event.elevationGain || 0);
  }, 0);

  return (
    <div className="h-32 flex flex-col [&:not(:last-child)]:border-r-1 p-2">
      <DurationStat duration={totalDuration} />
      <DistanceStat distance={totalDistance} />
      <ElevationStat elevation={totalElevation} />
    </div>
  );
}
