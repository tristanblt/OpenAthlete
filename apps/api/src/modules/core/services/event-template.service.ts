import { Injectable } from '@nestjs/common';

import { event_template } from '@openathlete/database';
import { CreateEventTemplateDto, keysToCamel } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { EVENT_INCLUDES, EventService } from './event.service';

@Injectable()
export class EventTemplateService {
  constructor(
    private prisma: PrismaService,
    private eventService: EventService,
  ) {}

  async getMyEventTemplates(user: AuthUser) {
    const templates = await this.prisma.event_template.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        event: {
          include: EVENT_INCLUDES,
        },
      },
    });
    return templates.map((t) =>
      keysToCamel({
        ...t,
        event: this.eventService.prismaEventToEvent(t.event),
      }),
    );
  }

  async createEventTemplate(user: AuthUser, body: CreateEventTemplateDto) {
    const event = await this.eventService.duplicateEvent(user, body.eventId);

    const eventTemplate = await this.prisma.event_template.create({
      data: {
        user_id: user.user_id,
        event_id: event.event_id,
      },
    });

    return keysToCamel(eventTemplate);
  }

  async deleteEventTemplate(
    user: AuthUser,
    eventTemplateId: event_template['event_template_id'],
  ) {
    const eventTemplate = await this.prisma.event_template.findUnique({
      where: {
        event_template_id: eventTemplateId,
      },
    });

    if (!eventTemplate) {
      throw new Error('Event template not found');
    }

    if (eventTemplate.user_id !== user.user_id) {
      throw new Error('Unauthorized');
    }

    await this.prisma.event_template.delete({
      where: {
        event_template_id: eventTemplateId,
      },
    });
  }
}
