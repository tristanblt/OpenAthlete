import axios, { isAxiosError } from 'axios';
import e from 'express';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  connector,
  connector_provider,
  event,
  event_activity,
} from '@openathlete/database';
import { ApiEnvSchemaType } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { mapStravaSportType } from '../../helpers/strava';
import { StravaSummaryActivity } from '../../types/connector';

@Injectable()
export class StravaConnectorService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService<ApiEnvSchemaType, true>,
  ) {}

  getStravaUri(): string {
    return `https://www.strava.com/oauth/authorize?client_id=${this.configService.get(
      'STRAVA_CLIENT_ID',
    )}&redirect_uri=${this.configService.get(
      'STRAVA_REDIRECT_URI',
    )}&response_type=code&scope=read,activity:read_all`;
  }

  async setStravaToken(user: AuthUser, code: string) {
    try {
      const { data } = await axios.post(
        'https://www.strava.com/oauth/token',
        {
          client_id: this.configService.get('STRAVA_CLIENT_ID'),
          client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
          code,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const connector = await this.prisma.connector.create({
        data: {
          provider: connector_provider.STRAVA,
          token: data.refresh_token,
          athlete: {
            connect: {
              user_id: user.user_id,
            },
          },
        },
        include: {
          athlete: true,
        },
      });

      await this.fetchInitialStravaData(connector);
    } catch (error) {
      if (isAxiosError(error)) console.log(error.response?.data);
      throw new InternalServerErrorException();
    }
  }

  async getStravaAccessToken(refreshToken: string) {
    const { data } = await axios.post(
      'https://www.strava.com/api/v3/oauth/token',
      {
        client_id: this.configService.get('STRAVA_CLIENT_ID'),
        client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return data.access_token;
  }

  async fetchStravaActivityData(
    accessToken: string,
    event: event,
    activity: StravaSummaryActivity,
  ): Promise<event_activity> {
    const { data } = await axios.get(
      `https://www.strava.com/api/v3/activities/${activity.id}/streams`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          keys: 'time,distance,latlng,altitude,velocity_smooth,heartrate,cadence,watts,temp,moving,grade_smooth',
        },
      },
    );

    const mergedData: Record<string, (number | number[] | boolean)[]> = {};

    for (const stream of data) {
      mergedData[stream.type] = stream.data;
    }

    return this.prisma.event_activity.create({
      data: {
        provider: connector_provider.STRAVA,
        distance: activity.distance,
        elevation_gain: activity.total_elevation_gain,
        moving_time: activity.moving_time,
        average_speed: activity.average_speed,
        max_speed: activity.max_speed,
        average_cadence: activity.average_cadence,
        average_watts: activity.average_watts,
        max_watts: activity.max_watts,
        weighted_average_watts: activity.weighted_average_watts,
        average_heartrate: activity.average_heartrate,
        max_heartrate: activity.max_heartrate,
        kilojoules: activity.kilojoules,
        sport: mapStravaSportType(activity.sport_type),
        stream: mergedData,
        external_id: activity.id.toString(),
        event: {
          connect: {
            event_id: event.event_id,
          },
        },
      },
    });
  }

  async fetchInitialStravaData(
    connector: connector & { athlete: { user_id: number } },
  ) {
    const accessToken = await this.getStravaAccessToken(connector.token);
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const { data } = await axios.get<StravaSummaryActivity[]>(
        `https://www.strava.com/api/v3/athlete/activities?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      for (const activity of data) {
        const endDate = new Date(activity.start_date);
        endDate.setSeconds(endDate.getSeconds() + activity.elapsed_time);

        const existingActivity = await this.prisma.event_activity.findFirst({
          where: {
            external_id: activity.id.toString(),
          },
        });

        if (existingActivity) {
          continue;
        }

        const event = await this.prisma.event.create({
          data: {
            athlete: {
              connect: {
                user_id: connector.athlete.user_id,
              },
            },
            name: activity.name,
            type: 'ACTIVITY',
            start_date: new Date(activity.start_date),
            end_date: endDate,
          },
        });

        await this.fetchStravaActivityData(accessToken, event, activity);

        break; // TODO: Remove this break
      }

      page++;

      break; // TODO: Remove this break
    }
  }
}
