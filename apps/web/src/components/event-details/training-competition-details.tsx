import {
  useSetRelatedActivityMutation,
  useUnsetRelatedActivityMutation,
} from '@/services/event';

import {
  CompetitionEvent,
  EVENT_TYPE,
  TrainingEvent,
  formatDistance,
} from '@openathlete/shared';

import { DistanceStat, DurationStat, ElevationStat } from '../numeric-stats';
import { SelectEvent } from '../select-event';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface P {
  event: CompetitionEvent | TrainingEvent;
}

export function TrainingCompetitionDetails({ event }: P) {
  const setRelatedActivityMutation = useSetRelatedActivityMutation();
  const unsetRelatedActivityMutation = useUnsetRelatedActivityMutation();

  console.log(event);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {event.goalDuration && (
              <DurationStat
                label="Goal Duration"
                duration={event.goalDuration}
              />
            )}
            {event.goalDistance && (
              <DistanceStat
                label="Goal Distance"
                distance={event.goalDistance}
              />
            )}
            {event.goalElevationGain && (
              <ElevationStat
                label="Goal Elevation Gain"
                elevation={event.goalElevationGain}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Related Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <SelectEvent
              value={event.relatedActivity?.eventId}
              onChange={(activityId) => {
                setRelatedActivityMutation.mutate({
                  eventId: event.eventId,
                  activityId,
                });
              }}
              className="flex-1"
              filter={(e, events) => {
                if (e.type !== EVENT_TYPE.ACTIVITY) return false;
                const startFilter = new Date(event.startDate);
                startFilter.setDate(startFilter.getDate() - 3);
                const endFilter = new Date(event.endDate);
                endFilter.setDate(endFilter.getDate() + 3);
                const isInRelatedActivity = events.some(
                  (relatedEvent) =>
                    (relatedEvent.type === EVENT_TYPE.TRAINING ||
                      relatedEvent.type === EVENT_TYPE.COMPETITION) &&
                    relatedEvent.relatedActivity?.eventId === e.eventId,
                );
                return (
                  startFilter.getTime() < e.startDate.getTime() &&
                  endFilter.getTime() > e.endDate.getTime() &&
                  !isInRelatedActivity
                );
              }}
              displayRow={(e) => (
                <div>
                  {e.name}{' '}
                  {e.type === EVENT_TYPE.ACTIVITY
                    ? `(${formatDistance(e.distance)} km)`
                    : ''}
                </div>
              )}
            />
            {!!event.relatedActivity?.eventId && (
              <Button
                onClick={() => {
                  unsetRelatedActivityMutation.mutate(event.eventId);
                }}
                isLoading={
                  unsetRelatedActivityMutation.isPending ||
                  setRelatedActivityMutation.isPending
                }
              >
                Remove
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {event.description && (
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            {event.description.split('\n').map((part) => (
              <>
                {part}
                <br />
              </>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
