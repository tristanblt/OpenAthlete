import { subject } from '@casl/ability';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { athlete } from '@openathlete/database';
import { keysToCamel } from '@openathlete/shared';

import { CaslAbilityFactory } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

const ATHLETE_INCLUDES = {
  training_zones: {
    include: {
      values: true,
    },
  },
  user: {
    select: {
      user_id: true,
      first_name: true,
      last_name: true,
      email: true,
    },
  },
};

@Injectable()
export class AthleteService {
  constructor(
    private prisma: PrismaService,
    private readonly abilities: CaslAbilityFactory,
  ) {}

  async getAthleteById(id: athlete['athlete_id'], user: AuthUser) {
    const athlete = await this.prisma.athlete.findUnique({
      where: { athlete_id: id },
      include: ATHLETE_INCLUDES,
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    const ability = await this.abilities.getFor({ user });
    if (!ability.can('read', subject('athlete', athlete))) {
      throw new ForbiddenException('Not allowed to access this athlete');
    }

    return keysToCamel(athlete);
  }

  async getAthleteByUserId(user: AuthUser) {
    const athlete = await this.prisma.athlete.findFirst({
      where: { user_id: user.user_id },
      include: ATHLETE_INCLUDES,
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    const ability = await this.abilities.getFor({ user });
    if (!ability.can('read', subject('athlete', athlete))) {
      throw new ForbiddenException('Not allowed to access this athlete');
    }

    return keysToCamel(athlete);
  }

  async getMyCoachedAthletes(userId: AuthUser['user_id']) {
    const athletes = await this.prisma.athlete.findMany({
      where: { coach_athletes: { some: { user_id: userId } } },
      include: ATHLETE_INCLUDES,
    });

    return athletes.map((athlete) => keysToCamel(athlete));
  }

  async getMyCoaches(userId: AuthUser['user_id']) {
    const users = await this.prisma.user.findMany({
      where: { coach_athletes: { some: { athlete_id: userId } } },
    });
    return users.map((user) => keysToCamel(user));
  }

  async inviteCoach(userId: AuthUser['user_id'], email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const athlete = await this.prisma.athlete.findUnique({
      where: { user_id: userId },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    await this.prisma.coach_athlete.create({
      data: {
        athlete_id: athlete.athlete_id,
        user_id: user.user_id,
      },
    });
  }

  async inviteAthlete(userId: AuthUser['user_id'], email: string) {
    // TODO: implement this with a proper invitation system
  }

  async removeAthlete(
    userId: AuthUser['user_id'],
    athleteId: athlete['athlete_id'],
  ) {
    const athlete = await this.prisma.athlete.findUnique({
      where: { athlete_id: athleteId },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    await this.prisma.coach_athlete.deleteMany({
      where: { athlete_id: athleteId, user_id: userId },
    });
  }

  async removeCoach(userId: AuthUser['user_id'], coachId: athlete['user_id']) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: coachId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const athlete = await this.prisma.athlete.findUnique({
      where: { user_id: userId },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    await this.prisma.coach_athlete.deleteMany({
      where: { athlete_id: athlete.athlete_id, user_id: user.user_id },
    });
  }
}
