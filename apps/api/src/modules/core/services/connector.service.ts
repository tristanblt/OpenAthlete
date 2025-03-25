import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { connector_provider } from '@openathlete/database';
import { ApiEnvSchemaType } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ConnectorService {
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

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.configService.get('STRAVA_CLIENT_ID'),
        client_secret: this.configService.get('STRAVA_CLIENT_SECRET'),
        code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await res.json();

    if (data.errors) {
      throw new InternalServerErrorException('Failed to connect to Strava');
    }

    await this.prisma.connector.create({
      data: {
        provider: connector_provider.STRAVA,
        token: data.refresh_token,
        athlete: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });
  }
}
