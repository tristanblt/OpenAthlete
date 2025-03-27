import client, { routes } from '@/utils/axios';

import { CreateEventDto, Event } from '@openathlete/shared';

const mapEvent = (event: Event): Event => {
  return {
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  };
};

export class EventService {
  static async createEvent(body: CreateEventDto): Promise<Event> {
    const res = await client.post(routes.event.create, body);
    return mapEvent(res.data);
  }

  static async getMyEvents(): Promise<Event[]> {
    const res = await client.get(routes.event.getMyEvents);
    const data = res.data as Event[];
    return data.map((event) => mapEvent(event));
  }

  static async getEvent(eventId: Event['eventId']): Promise<Event> {
    const res = await client.get(routes.event.getEvent(eventId));
    return mapEvent(res.data);
  }
}
