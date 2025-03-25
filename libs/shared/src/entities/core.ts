import {
  athlete,
  event,
  event_type,
  user,
  user_role,
} from '@openathlete/database';

import { EVENT_TYPE } from '../types/misc';
import { ConvertKeysToCamelCase } from '../utils/data.mapper';

export type UserRole = ConvertKeysToCamelCase<user_role>;

export interface User extends ConvertKeysToCamelCase<user> {
  roles: UserRole[];
  athlete?: Athlete;
}

export interface Athlete extends ConvertKeysToCamelCase<athlete> {
  user?: User;
}

export interface Event extends ConvertKeysToCamelCase<event> {
  type: EVENT_TYPE;
}

export interface TrainingEvent extends Event {}

export interface CompetitionEvent extends Event {}

export interface NoteEvent extends Event {}
