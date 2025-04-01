import client, { routes } from '@/utils/axios';

import { ActivityStream, CreateEventDto, Event } from '@openathlete/shared';

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

  static async getEventStream(
    eventId: Event['eventId'],
    resolution: number,
    keys?: string[],
  ): Promise<ActivityStream> {
    const res = await client.get(routes.event.getEventStream(eventId), {
      params: { resolution, keys: keys?.join(',') },
    });
    return res.data;
  }

  static async deleteEvent(eventId: Event['eventId']): Promise<void> {
    await client.delete(routes.event.deleteEvent(eventId));
  }
}
