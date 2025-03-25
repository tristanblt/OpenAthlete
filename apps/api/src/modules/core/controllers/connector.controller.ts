import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { ConnectorService } from '../services/connector.service';

@Controller('connector')
export class ConnectorController {
  constructor(private connectorService: ConnectorService) {}

  @Get('strava/uri')
  getStravaUri() {
    return this.connectorService.getStravaUri();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Post('strava/token')
  setStravaToken(@JwtUser() user: AuthUser, @Body('code') code: string) {
    return this.connectorService.setStravaToken(user, code);
  }
}
