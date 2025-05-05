import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { sport_type } from '@openathlete/database';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { RecordService } from '../services/record.service';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get()
  getMyEventTemplates(
    @JwtUser() user: AuthUser,
    @Query('sport') sport?: string,
  ) {
    return this.recordService.getMyRecords(user, sport as sport_type);
  }
}
