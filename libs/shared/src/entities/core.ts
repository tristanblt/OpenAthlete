import { athlete, event_type, user, user_role } from '@openathlete/database';

import { ConvertKeysToCamelCase } from '../utils/data.mapper';

export type UserRole = ConvertKeysToCamelCase<user_role>;

export interface User extends ConvertKeysToCamelCase<user> {
  roles: UserRole[];
  athlete?: Athlete;
}

export interface Athlete extends ConvertKeysToCamelCase<athlete> {
  user?: User;
}

export type EventType = ConvertKeysToCamelCase<event_type>;

export interface Event {
  event_id: number;
  name: string;
  athlete_id: number;
  start_date: Date;
  end_date: Date;
  type: EventType;
}

export interface TrainingEvent extends Event {}

export interface CompetitionEvent extends Event {}

export interface NoteEvent extends Event {}
