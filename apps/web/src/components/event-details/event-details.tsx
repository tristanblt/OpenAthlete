import { useGetEventQuery } from '@/services/event';

import { EVENT_TYPE, Event } from '@openathlete/shared';

import { ActivityDetails } from './activity-details';

interface P {
  eventId: Event['eventId'];
}

export function EventDetails({ eventId }: P) {
  const { data: event } = useGetEventQuery(eventId);

  if (event?.type === EVENT_TYPE.ACTIVITY) {
    return <ActivityDetails event={event} />;
  }
}
