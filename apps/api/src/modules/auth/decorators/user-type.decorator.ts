import { Reflector } from '@nestjs/core';

import { user_role } from '@openathlete/database';

export const UserTypes = Reflector.createDecorator<user_role[]>();
