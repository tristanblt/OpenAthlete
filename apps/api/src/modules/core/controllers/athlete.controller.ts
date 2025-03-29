import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { AthleteService } from '../services/athlete.service';

@Controller('athlete')
export class AthleteController {
  constructor(private athleteService: AthleteService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get('me')
  getMyAthlete(@JwtUser() user: AuthUser) {
    return this.athleteService.getAthleteByUserId(user.user_id);
  }
}
