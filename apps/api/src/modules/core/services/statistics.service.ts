import { ForbiddenException, Injectable } from '@nestjs/common';

import {
  athlete,
  event,
  event_activity,
  event_type,
  sport_type,
} from '@openathlete/database';
import { GetStatisticsForPeriodDto, SPORT_TYPE } from '@openathlete/shared';

import { CaslAbilityFactory } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private readonly abilities: CaslAbilityFactory,
  ) {}

  private computeBasicStatisticsForActivities(
    activities: (event & { activity: event_activity | null })[],
  ): {
    duration: number;
    distance: number;
    elevationGain: number;
    count: number;
  } {
    const duration = activities.reduce((acc, activity) => {
      const start = new Date(activity.start_date);
      const end = new Date(activity.end_date);
      const diff = end.getTime() - start.getTime();
      const seconds = diff / 1000;
      return acc + seconds;
    }, 0);
    const distance = activities.reduce((acc, activity) => {
      if (activity.activity?.distance) {
        return acc + activity.activity.distance;
      }
      return acc;
    }, 0);
    const elevationGain = activities.reduce((acc, activity) => {
      if (activity.activity?.elevation_gain) {
        return acc + activity.activity.elevation_gain;
      }
      return acc;
    }, 0);

    return {
      duration,
      distance,
      elevationGain,
      count: activities.length,
    };
  }

  async getStatisticsForPeriod(
    user: AuthUser,
    athleteId: athlete['athlete_id'],
    startDate: Date,
    endDate: Date,
  ): Promise<GetStatisticsForPeriodDto> {
    const ability = await this.abilities.getFor({ user });
    if (!ability.can('read', 'athlete')) {
      throw new ForbiddenException('Not allowed to access this athlete');
    }

    const events = await this.prisma.event.findMany({
      where: {
        athlete_id: athleteId,
        type: event_type.ACTIVITY,
        start_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        activity: true,
      },
    });

    const groupedBySport = events.reduce(
      (acc, event) => {
        const sport = event.activity?.sport as sport_type;
        if (!acc[sport]) {
          acc[sport] = [];
        }
        acc[sport].push(event);
        return acc;
      },
      {} as Record<sport_type, (event & { activity: event_activity | null })[]>,
    );

    const sportStatistics = Object.entries(groupedBySport).map(
      ([sport, events]) => {
        return {
          sport: sport as SPORT_TYPE,
          ...this.computeBasicStatisticsForActivities(events),
        };
      },
    );

    return {
      ...this.computeBasicStatisticsForActivities(events),
      sports: sportStatistics,
    };
  }
}
