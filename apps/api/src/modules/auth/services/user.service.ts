import * as argon2 from 'argon2';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Prisma, user, user_role } from '@openathlete/database';
import {
  ApiEnvSchemaType,
  CreateAccountDto,
  UpdateAccountDto,
  keysToCamel,
} from '@openathlete/shared';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { AuthUser } from '../decorators/user.decorator';

@Injectable()
export class UserService {
  private readonly logger = new Logger();
  HASH_PEPPER: Buffer | undefined;

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService<ApiEnvSchemaType, true>,
  ) {
    this.HASH_PEPPER = this.configService.get('HASH_PEPPER')
      ? Buffer.from(this.configService.get('HASH_PEPPER'))
      : undefined;
  }

  async findOneOrFail(where: Prisma.userWhereInput): Promise<user> {
    return this.prisma.user.findFirstOrThrow({ where });
  }

  async findOne(where: Prisma.userWhereInput): Promise<user | null> {
    return this.prisma.user.findFirst({ where });
  }

  async exists(where: Prisma.userWhereInput): Promise<boolean> {
    return this.prisma.user.findFirst({ where }).then((user) => !!user);
  }

  public hashPassword = async (plainPassword: string) =>
    await argon2.hash(plainPassword, {
      secret: this.HASH_PEPPER,
    });

  public getMe = async (user: AuthUser) => {
    return keysToCamel(
      await this.prisma.user.findUniqueOrThrow({
        where: { user_id: user.user_id },
        select: {
          user_id: true,
          email: true,
          first_name: true,
          last_name: true,
          roles: true,
        },
      }),
    );
  };

  public createAccount = async ({
    email,
    password,
    firstName,
    lastName,
  }: CreateAccountDto) => {
    const hashedPassword = await this.hashPassword(password);

    if (!hashedPassword) {
      throw new BadRequestException('Failed to hash password');
    }

    const userExists = await this.exists({ email });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    return keysToCamel(
      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          roles: [user_role.ATHLETE, user_role.COACH],
          athlete: {
            create: {},
          },
        },
        select: {
          user_id: true,
        },
      }),
    );
  };

  public updateAccount = async (user: AuthUser, data: UpdateAccountDto) => {
    return keysToCamel(
      await this.prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
        select: {
          first_name: true,
          last_name: true,
        },
      }),
    );
  };

  async comparePasswords(
    params: { pass_string: string; pass_hash: string },
    options?: { email?: string },
  ) {
    const { pass_string, pass_hash } = params || {};
    const { email } = options || {};

    const areCredentialsValid = await argon2.verify(pass_hash, pass_string, {
      secret: this.HASH_PEPPER,
    });
    if (!areCredentialsValid) {
      this.logger.log(
        `Invalid credentials for user${email ? ` with email ${email}` : ''}`,
      );
      throw new UnauthorizedException();
    }

    return areCredentialsValid;
  }
}
