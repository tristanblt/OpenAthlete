import { Injectable, NotFoundException } from '@nestjs/common';

import { athlete } from '@openathlete/database';
import { keysToCamel } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

const ATHLETE_INCLUDES = {
  training_zones: {
    include: {
      values: true,
    },
  },
};

@Injectable()
export class AthleteService {
  constructor(private prisma: PrismaService) {}

  async getAthleteById(id: athlete['athlete_id']) {
    const athlete = await this.prisma.athlete.findUnique({
      where: { athlete_id: id },
      include: ATHLETE_INCLUDES,
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    return keysToCamel(athlete);
  }

  async getAthleteByUserId(userId: AuthUser['user_id']) {
    const athlete = await this.prisma.athlete.findFirst({
      where: { user_id: userId },
      include: ATHLETE_INCLUDES,
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    return keysToCamel(athlete);
  }
}
