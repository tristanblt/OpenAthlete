import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { athlete, coach_athlete, user } from '@openathlete/database';

export type AuthUser = Pick<user, 'user_id' | 'email'> & {
  athlete: Pick<athlete, 'athlete_id'> | null;
  coach_athletes?: Array<Pick<coach_athlete, 'athlete_id'>>;
};

export const JwtUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): user => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
