import { athlete, user, user_role } from '@openathlete/database';

import { ConvertKeysToCamelCase } from '../utils/data.mapper';

export type UserRole = ConvertKeysToCamelCase<user_role>;

export interface User extends ConvertKeysToCamelCase<user> {
  roles: UserRole[];
  athlete?: Athlete;
}

export interface Athlete extends ConvertKeysToCamelCase<athlete> {
  user?: User;
}
