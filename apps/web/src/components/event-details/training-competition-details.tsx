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

import { SelectEvent } from '../select-event';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface P {
  event: CompetitionEvent | TrainingEvent;
}

export function TrainingCompetitionDetails({ event }: P) {
  const setRelatedActivityMutation = useSetRelatedActivityMutation();
  const unsetRelatedActivityMutation = useUnsetRelatedActivityMutation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
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
              filter={(e) => {
                if (e.type !== EVENT_TYPE.ACTIVITY) return false;
                const startFilter = new Date(event.startDate);
                startFilter.setDate(startFilter.getDate() - 3);
                const endFilter = new Date(event.endDate);
                endFilter.setDate(endFilter.getDate() + 3);
                return (
                  startFilter.getTime() < e.startDate.getTime() &&
                  endFilter.getTime() > e.endDate.getTime()
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
            <Button
              disabled={!event.relatedActivity?.eventId}
              onClick={() => {
                unsetRelatedActivityMutation.mutate(event.eventId);
              }}
            >
              Remove
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
