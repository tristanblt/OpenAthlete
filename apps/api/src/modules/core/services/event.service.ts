import e from 'express';

import { Injectable } from '@nestjs/common';

import {
  event,
  event_competition,
  event_note,
  event_training,
  user_role,
} from '@openathlete/database';
import { CreateEventDto } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  private prismaEventToEvent(
    event: event & {
      competition: event_competition | null;
      training: event_training | null;
      note: event_note | null;
    },
  ) {
    const { competition, training, note, ...rest } = event;

    return {
      ...rest,
      competition: competition ? { ...competition } : undefined,
      training: training ? { ...training } : undefined,
      note: note ? { ...note } : undefined,
    };
  }

  async getMyEvents(user: AuthUser) {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id
    ) {
      return this.getEventsOfAthlete(userEntity.athlete?.athlete_id).then(
        (events) => events.map(this.prismaEventToEvent),
      );
    }
  }

  async getEventsOfAthlete(athleteId: number) {
    return this.prisma.event.findMany({
      where: { athlete_id: athleteId },
      include: { training: true, competition: true, note: true },
    });
  }

  async createEvent(user: AuthUser, data: CreateEventDto) {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });

    const { type, endDate, startDate, name, athleteId, ...rest } = data;

    const finalAthleteId = athleteId || userEntity?.athlete?.athlete_id;

    if (!finalAthleteId) {
      throw new Error('Athlete ID is required');
    }

    return this.prisma.event.create({
      data: {
        athlete_id: finalAthleteId,
        start_date: startDate,
        end_date: endDate,
        name,
        type,
        [type.toLocaleLowerCase()]: {
          create: rest,
        },
      },
    });
  }
}
