import { Injectable, NotFoundException } from '@nestjs/common';

import {
  event,
  event_activity,
  event_competition,
  event_note,
  event_training,
  user_role,
} from '@openathlete/database';
import { CreateEventDto, keysToCamel } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { compressActivityStream } from '../helpers/activity-stream';

const EVENT_INCLUDES = {
  training: true,
  competition: true,
  note: true,
  activity: {
    // select all fields except stream
    select: {
      event_activity_id: true,
      event_id: true,
      distance: true,
      elevation_gain: true,
      moving_time: true,
      average_speed: true,
      max_speed: true,
      average_cadence: true,
      average_watts: true,
      max_watts: true,
      weighted_average_watts: true,
      average_heartrate: true,
      max_heartrate: true,
      kilojoules: true,
      external_id: true,
      sport: true,
      provider: true,
    },
  },
};
@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  private prismaEventToEvent(
    event: event & {
      competition: event_competition | null;
      training: event_training | null;
      note: event_note | null;
      activity: Omit<event_activity, 'stream'> | null;
    },
  ) {
    const { competition, training, note, activity, ...rest } = event;

    return {
      ...rest,
      ...(training ? { ...training } : {}),
      ...(competition ? { ...competition } : {}),
      ...(note ? { ...note } : {}),
      ...(activity ? { ...activity } : {}),
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
        (events) => events.map((e) => keysToCamel(this.prismaEventToEvent(e))),
      );
    }
  }

  async getEventById(user: AuthUser, eventId: event['event_id']) {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });
    const event = await this.prisma.event.findUnique({
      where: { event_id: eventId },
      include: EVENT_INCLUDES,
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id === event.athlete_id
    ) {
      return keysToCamel(this.prismaEventToEvent(event));
    }
  }

  async getEventsOfAthlete(athleteId: number) {
    return this.prisma.event.findMany({
      where: { athlete_id: athleteId },
      include: EVENT_INCLUDES,
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

    return keysToCamel(
      this.prisma.event.create({
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
      }),
    );
  }

  async getEventStream(
    user: AuthUser,
    eventId: event['event_id'],
    compression: number,
    keys?: string[],
  ) {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });
    const event = await this.prisma.event.findUnique({
      where: { event_id: eventId },
      include: { activity: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id === event.athlete_id
    ) {
      const activity = await this.prisma.event_activity.findUnique({
        where: { event_id: eventId },
        select: { stream: true },
      });

      if (!activity) {
        throw new NotFoundException('Activity not found');
      }

      const stream = activity.stream;

      if (!stream) {
        throw new NotFoundException('Stream not found');
      }

      const selectedStreams = keys ? keys : Object.keys(stream);

      const compressedStreams: Record<string, (number | number[] | boolean)[]> =
        {};

      for (const key of selectedStreams) {
        compressedStreams[key] = compressActivityStream(
          stream[key],
          compression,
        );
      }

      return compressedStreams;
    }
  }
}
