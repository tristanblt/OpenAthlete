import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { user } from '@openathlete/database';
import {
  ApiEnvSchemaType,
  AuthResponseDto,
  LoginDto,
} from '@openathlete/shared';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private readonly configService: ConfigService<ApiEnvSchemaType, true>,
  ) {}

  private createToken(
    userId: number,
    email: string,
    isRefresh: boolean,
  ): string {
    return sign(
      { userId: userId, email },
      this.configService.get('JWT_SECRET_KEY') || 'secret',
      {
        expiresIn: isRefresh ? '30d' : '1h',
      },
    );
  }

  async login(credentials: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = credentials;
    const user = await this.prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        user_id: true,
        password: true,
        email: true,
      },
    });
    if (!user?.password) throw new UnauthorizedException();

    await this.userService.comparePasswords(
      {
        pass_hash: user.password,
        pass_string: password,
      },
      { email },
    );

    return {
      accessToken: this.createToken(user.user_id, user.email, false),
      refreshToken: this.createToken(user.user_id, user.email, true),
    };
  }

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    const payload = verify(
      refreshToken,
      this.configService.get('JWT_SECRET_KEY') ?? '',
    ) as JwtPayload & Partial<{ userId: number }>;
    if (!payload.userId) throw new UnauthorizedException();
    const user = await this.prisma.user.findFirst({
      where: {
        user_id: payload.userId,
      },
      select: {
        user_id: true,
        email: true,
      },
    });
    if (!user) throw new UnauthorizedException();

    return {
      accessToken: this.createToken(user.user_id, user.email, false),
      refreshToken: this.createToken(user.user_id, user.email, true),
    };
  }

  async validateUser(payload: JwtPayload): Promise<user> {
    if (!payload.userId) {
      throw new UnauthorizedException();
    }
    if (!payload.email) {
      throw new UnauthorizedException();
    }
    try {
      const user = (await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          user_id: true,
          email: true,
        },
      })) as user;

      if (user.user_id !== payload.userId) {
        throw new Error(`Invalid id for email ${user.email}`);
      }

      return user;
    } catch (error) {
      this.logger.error('Error in validateUser', error);
      throw error;
    }
  }
}
