import { ZodValidationPipe } from 'nestjs-zod';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { event } from '@openathlete/database';
import { CreateEventDto, createEventDtoSchema } from '@openathlete/shared';

import { JwtUser, UserTypeGuard } from 'src/modules/auth';
import { AuthUser } from 'src/modules/auth/decorators/user.decorator';

import { EventService } from '../services';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get()
  getMyEvents(@JwtUser() user: AuthUser) {
    return this.eventService.getMyEvents(user);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get(':eventId')
  getEvent(
    @JwtUser() user: AuthUser,
    @Param('eventId', ParseIntPipe) eventId: event['event_id'],
  ) {
    return this.eventService.getEventById(user, eventId);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Post()
  createEvent(
    @JwtUser() user: AuthUser,
    @Body(new ZodValidationPipe(createEventDtoSchema)) body: CreateEventDto,
  ) {
    return this.eventService.createEvent(user, body);
  }
}
