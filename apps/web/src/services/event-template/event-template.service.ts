import client, { routes } from '@/utils/axios';

import {
  CreateEventTemplateDto,
  Event,
  EventTemplate,
} from '@openathlete/shared';

export class EventTemplateService {
  static async createEventTemplate(
    body: CreateEventTemplateDto,
  ): Promise<Event> {
    const res = await client.post(routes.eventTemplate.create, body);
    return res.data;
  }

  static async getMyEventTemplates(): Promise<EventTemplate[]> {
    const res = await client.get(routes.eventTemplate.getMyTemplates);
    return res.data;
  }

  static async deleteEventTemplate(
    eventTemplateId: EventTemplate['eventTemplateId'],
  ): Promise<void> {
    await client.delete(routes.eventTemplate.delete(eventTemplateId));
  }
}
