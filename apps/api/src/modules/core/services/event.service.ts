import * as argon2 from 'argon2';
import ical, { ICalCalendarMethod } from 'ical-generator';

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  event,
  event_activity,
  event_competition,
  event_note,
  event_training,
  event_type,
  user_role,
} from '@openathlete/database';
import {
  ActivityStream,
  ApiEnvSchemaType,
  CompressedActivityStream,
  CreateEventDto,
  keysToCamel,
  keysToSnake,
} from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import {
  reductActivityStreamToResolution,
  uncompressActivityStream,
} from '../helpers/activity-stream';

const EVENT_INCLUDES = {
  training: {
    include: {
      related_activity: true,
    },
  },
  competition: {
    include: {
      related_activity: true,
    },
  },
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
  HASH_PEPPER: Buffer | undefined;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService<ApiEnvSchemaType, true>,
  ) {
    this.HASH_PEPPER = this.configService.get('HASH_PEPPER')
      ? Buffer.from(this.configService.get('HASH_PEPPER'))
      : undefined;
  }

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

    const { type, end_date, start_date, name, athlete_id, ...rest } =
      keysToSnake(data);

    const finalAthleteId = athlete_id || userEntity?.athlete?.athlete_id;

    if (!finalAthleteId) {
      throw new Error('Athlete ID is required');
    }

    return keysToCamel(
      this.prisma.event.create({
        data: {
          athlete_id: finalAthleteId,
          start_date,
          end_date,
          name,
          type,
          [type.toLocaleLowerCase()]: {
            create: rest,
          },
        },
      }),
    );
  }

  async updateEvent(
    user: AuthUser,
    eventId: event['event_id'],
    data: Partial<CreateEventDto>,
  ) {
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

    const { type, end_date, start_date, name, athlete_id, ...rest } =
      keysToSnake(data);

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id === event.athlete_id
    ) {
      return this.prisma.event.update({
        where: { event_id: eventId },
        data: {
          start_date,
          end_date,
          name,
          type,
          ...(type
            ? {
                [type.toLocaleLowerCase()]: {
                  update: rest,
                },
              }
            : {}),
        },
      });
    }
  }

  async deleteEvent(user: AuthUser, eventId: event['event_id']) {
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
      await this.prisma.event_training.deleteMany({
        where: { event_id: eventId },
      });
      await this.prisma.event_competition.deleteMany({
        where: { event_id: eventId },
      });
      await this.prisma.event_note.deleteMany({
        where: { event_id: eventId },
      });
      await this.prisma.event_activity.deleteMany({
        where: { event_id: eventId },
      });

      return this.prisma.event.delete({
        where: { event_id: eventId },
      });
    }
    throw new ForbiddenException('You are not allowed to delete this event');
  }

  async getEventStream(
    user: AuthUser,
    eventId: event['event_id'],
    resolution: number,
    keys?: (keyof ActivityStream)[],
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

      const compressedStream = activity.stream as CompressedActivityStream;
      const stream = uncompressActivityStream(compressedStream);

      if (!stream) {
        throw new NotFoundException('Stream not found');
      }

      const selectedStreams = keys ? keys : Object.keys(stream);

      const compressedStreams: ActivityStream = {};

      for (const key of selectedStreams) {
        if (!stream[key]) {
          continue;
        }

        compressedStreams[key] = reductActivityStreamToResolution(
          stream[key],
          resolution,
        );
      }

      return compressedStreams;
    }
  }

  async setRelatedActivity(
    user: AuthUser,
    eventId: event['event_id'],
    activityId: event['event_id'],
  ): Promise<void> {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });
    const event = await this.prisma.event.findUnique({
      where: { event_id: eventId },
    });
    const activity = await this.prisma.event.findUnique({
      where: { event_id: activityId },
    });

    if (!userEntity || !event || !activity) {
      throw new NotFoundException();
    }

    if (
      event.type !== event_type.TRAINING &&
      event.type !== event_type.COMPETITION
    ) {
      throw new BadRequestException(
        'eventId must refer to a training or a competition',
      );
    }

    if (activity.type !== event_type.ACTIVITY) {
      throw new BadRequestException('activityId must refer to an activity');
    }

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id === event.athlete_id &&
      userEntity.athlete?.athlete_id === activity.athlete_id
    ) {
      if (event.type === 'COMPETITION') {
        await this.prisma.event_competition.update({
          where: { event_id: eventId },
          data: { related_activity: { connect: { event_id: activityId } } },
        });
      } else if (event.type === 'TRAINING') {
        await this.prisma.event_training.update({
          where: { event_id: eventId },
          data: { related_activity: { connect: { event_id: activityId } } },
        });
      }
    }
  }

  async unsetRelatedActivity(
    user: AuthUser,
    eventId: event['event_id'],
  ): Promise<void> {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });
    const event = await this.prisma.event.findUnique({
      where: { event_id: eventId },
    });

    if (!userEntity || !event) {
      throw new NotFoundException();
    }

    if (
      userEntity?.roles.includes(user_role.ATHLETE) &&
      userEntity.athlete?.athlete_id === event.athlete_id
    ) {
      if (event.type === 'COMPETITION') {
        await this.prisma.event_competition.update({
          where: { event_id: eventId },
          data: { related_activity: { disconnect: true } },
        });
      } else if (event.type === 'TRAINING') {
        await this.prisma.event_training.update({
          where: { event_id: eventId },
          data: { related_activity: { disconnect: true } },
        });
      }
    }
  }

  async getIcalCalendar(base64Secret: string): Promise<string> {
    const secret = Buffer.from(base64Secret, 'base64').toString('utf-8');
    const users = await this.prisma.user.findMany({
      select: { user_id: true, athlete: { select: { athlete_id: true } } },
    });
    const user = await Promise.all(
      users.map(async (user) => {
        const isValid = await argon2.verify(secret, user.user_id.toString(), {
          secret: this.HASH_PEPPER,
        });
        return isValid ? user : null;
      }),
    ).then((results) => results.find((user) => user !== null));

    if (!user || !user.athlete?.athlete_id) {
      throw new UnauthorizedException();
    }

    const events = await this.prisma.event.findMany({
      where: {
        athlete_id: user.athlete.athlete_id,
        type: {
          not: event_type.ACTIVITY,
        },
      },
    });
    const calendar = ical({
      name: 'OpenAthlete',
      timezone: 'UTC',
      method: ICalCalendarMethod.PUBLISH,
    });
    events.forEach((event) => {
      const { start_date, end_date, name, type } = event;
      const eventType = type.toLowerCase();
      const eventData = {
        start: start_date,
        end: end_date,
        summary: name,
        description: `Type: ${eventType}`,
        uid: event.event_id,
      };
      calendar.createEvent(eventData);
    });

    return calendar.toString();
  }

  async getMyIcalCalendarSecret(user: AuthUser): Promise<string> {
    const userEntity = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      include: { athlete: true },
    });

    if (!userEntity?.athlete?.athlete_id) {
      throw new NotFoundException('Athlete not found');
    }

    const hash = await argon2.hash(userEntity.user_id.toString(), {
      secret: this.HASH_PEPPER,
    });

    return Buffer.from(hash).toString('base64');
  }
}
