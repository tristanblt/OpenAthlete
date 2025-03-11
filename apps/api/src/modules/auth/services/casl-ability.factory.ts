import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Subjects as CASLSubjects, PrismaQuery } from '@casl/prisma';

import { Injectable, Logger } from '@nestjs/common';

import { user as User } from '@openathlete/database';

import { createPrismaAbility } from './casl-prisma';
import { UserService } from './user.service';

export type CRUD = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subjects = CASLSubjects<{
  User: User;
}>;

export type AppAbility = PureAbility<[CRUD, Subjects | 'all'], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
  private readonly logger = new Logger('CaslAbilityFactory');
  constructor(private readonly userService: UserService) {}

  private _userFactory(
    params: { user: User },
    { can, cannot }: AbilityBuilder<AppAbility>,
  ) {
    const { user } = params || {};

    if (!user) return;

    // User can read their own profile
    can('manage', 'User', 'user_id');
  }

  async getFor(params: { user: User }): Promise<AppAbility> {
    const { user } = params || {};

    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

    this._userFactory({ user }, builder);

    return builder.build();
  }
}
