import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { user } from '@openathlete/database';

export type AuthUser = Pick<user, 'user_id' | 'email'>;

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): user => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
