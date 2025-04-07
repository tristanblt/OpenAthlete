import { CheckCircle2 } from 'lucide-react';

import {
  ActivityEvent,
  CompetitionEvent,
  EVENT_TYPE,
  Event,
  TrainingEvent,
  getActivityDuration,
} from '@openathlete/shared';

import { DistanceStat, DurationStat, ElevationStat } from '../numeric-stats';

interface P {
  events: Event[];
}

export function CalendarWeekSummary({ events }: P) {
  const activities = events.filter(
    (event) => event.type === EVENT_TYPE.ACTIVITY,
  ) as ActivityEvent[];
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
  const trainingCompetitions = events.filter(
    (event) =>
      event.type === EVENT_TYPE.TRAINING ||
      event.type === EVENT_TYPE.COMPETITION,
  ) as (TrainingEvent | CompetitionEvent)[];
  const doneTrainingCompetitions = trainingCompetitions.filter(
    (event) => event.relatedActivityId,
  );

  return (
    <div className="h-32 flex flex-col [&:not(:last-child)]:border-r-1 p-2">
      {!!trainingCompetitions.length && (
        <div className="flex gap-1 items-center">
          <span>
            {doneTrainingCompetitions.length} / {trainingCompetitions.length}
          </span>
          {doneTrainingCompetitions.length === trainingCompetitions.length && (
            <CheckCircle2 size={14} />
          )}
        </div>
      )}
      <DurationStat duration={totalDuration} />
      <DistanceStat distance={totalDistance} />
      <ElevationStat elevation={totalElevation} />
    </div>
  );
}
