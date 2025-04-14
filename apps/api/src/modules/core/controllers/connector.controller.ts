import { Request, Response } from 'express';

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { StravaConnectorService } from '../services/connector/strava.service';

@Controller('connector')
export class ConnectorController {
  constructor(private stravaConnectorService: StravaConnectorService) {}

  @Get('strava/uri')
  getStravaUri() {
    return this.stravaConnectorService.getStravaUri();
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Post('strava/token')
  setStravaToken(@JwtUser() user: AuthUser, @Body('code') code: string) {
    return this.stravaConnectorService.setStravaToken(user, code);
  }

  @Get('strava/webhook')
  stravaWebhookGet(@Req() request: Request, @Res() response: Response) {
    return this.stravaConnectorService.stravaWebhookGet(request, response);
  }

  @Post('strava/webhook')
  stravaWebhookPost(@Body() body) {
    return this.stravaConnectorService.stravaWebhookPost(body);
  }
}
