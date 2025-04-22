import { ZodValidationPipe } from 'nestjs-zod';

import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  CreateAccountDto,
  UpdateAccountDto,
  createAccountDtoSchema,
  updateAccountDtoSchema,
} from '@openathlete/shared';

import { JwtUser } from '../decorators';
import { AuthUser } from '../decorators/user.decorator';
import { UserTypeGuard } from '../guards';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createAcount(
    @Body(new ZodValidationPipe(createAccountDtoSchema)) body: CreateAccountDto,
  ) {
    return this.userService.createAccount(body);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Patch()
  updateAccount(
    @JwtUser() user: AuthUser,
    @Body(new ZodValidationPipe(updateAccountDtoSchema)) body: UpdateAccountDto,
  ) {
    return this.userService.updateAccount(user, body);
  }

  @UseGuards(AuthGuard('jwt'), UserTypeGuard)
  @Get('me')
  getMe(@JwtUser() user: AuthUser) {
    return this.userService.getMe(user);
  }
}
