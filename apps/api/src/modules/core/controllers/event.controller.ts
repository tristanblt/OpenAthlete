import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { EventService } from '../services';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  getMyEvents(@JwtUser() user: AuthUser) {
    return this.eventService.getMyEvents(user);
  }
}
