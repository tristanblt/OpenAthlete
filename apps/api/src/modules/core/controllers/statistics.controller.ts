import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { athlete } from '@openathlete/database';

import { UserTypeGuard } from 'src/modules/auth';
import { AuthUser, JwtUser } from 'src/modules/auth/decorators/user.decorator';

import { StatisticsService } from '../services/statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get()
  getStatisticsForPeriod(
    @JwtUser() user: AuthUser,
    @Query('athleteId', ParseIntPipe) athleteId: athlete['athlete_id'],
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    return this.statisticsService.getStatisticsForPeriod(
      user,
      athleteId,
      startDate,
      endDate,
    );
  }
}
