import axios from 'axios';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { connector, connector_provider } from '@openathlete/database';
import { ApiEnvSchemaType } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

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
    const existingConnector = await this.prisma.connector.findFirst({
      where: {
        athlete: {
          user_id: user.user_id,
        },
        provider: connector_provider.STRAVA,
      },
    });

    if (existingConnector) {
      throw new ConflictException('Strava connector already exists');
    }

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

    if (data.errors) {
      throw new InternalServerErrorException('Failed to connect to Strava');
    }

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

    if (data.errors) {
      throw new InternalServerErrorException('Failed to refresh Strava token');
    }

    return data.access_token;
  }

  async fetchInitialStravaData(
    connector: connector & { athlete: { user_id: number } },
  ) {
    const accessToken = await this.getStravaAccessToken(connector.token);
    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const { data } = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (data.errors) {
        throw new InternalServerErrorException('Failed to fetch Strava data');
      }

      if (data.length === 0) {
        hasMoreData = false;
        break;
      }

      for (const activity of data) {
        const endDate = new Date(activity.start_date);
        endDate.setSeconds(endDate.getSeconds() + activity.elapsed_time);
        await this.prisma.event.create({
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
            activity: {
              create: {
                distance: activity.distance,
                elevation_gain: activity.total_elevation_gain,
                external_id: String(activity.id),
              },
            },
          },
        });
      }

      page++;
    }
  }
}
