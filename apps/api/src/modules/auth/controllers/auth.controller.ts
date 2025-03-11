import { ZodValidationPipe } from 'nestjs-zod';

import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import {
  AuthResponseDto,
  LoginDto,
  RefreshTokenDto,
  loginDtoSchema,
} from '@openathlete/shared';

import { AuthService, UserService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginDtoSchema)) credentials: LoginDto,
  ): Promise<AuthResponseDto> {
    return await this.authService.login(credentials);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refresh(body.refreshToken);
  }

  @Get('email-exists')
  async emailExists(@Query('email') email: string) {
    return this.userService.exists({
      email,
    });
  }
}
