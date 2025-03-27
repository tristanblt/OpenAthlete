import {
  athlete,
  connector_provider,
  event,
  event_activity,
  event_competition,
  event_note,
  event_training,
  event_type,
  user,
  user_role,
} from '@openathlete/database';

import { EVENT_TYPE } from '../types/misc';
import { ConvertKeysToCamelCase } from '../utils/data.mapper';

export type UserRole = ConvertKeysToCamelCase<user_role>;

export type ConnectorProvider = ConvertKeysToCamelCase<connector_provider>;

export interface User extends ConvertKeysToCamelCase<user> {
  roles: UserRole[];
  athlete?: Athlete;
}

export interface Athlete extends ConvertKeysToCamelCase<athlete> {
  user?: User;
}

export interface TrainingEvent
  extends ConvertKeysToCamelCase<event_training & event> {
  type: EVENT_TYPE.TRAINING;
}

export interface CompetitionEvent
  extends ConvertKeysToCamelCase<event & event_competition> {
  type: EVENT_TYPE.COMPETITION;
}

export interface NoteEvent extends ConvertKeysToCamelCase<event_note & event> {
  type: EVENT_TYPE.NOTE;
}

export interface ActivityEvent
  extends ConvertKeysToCamelCase<event & event_activity> {
  type: EVENT_TYPE.ACTIVITY;
}

export type Event =
  | TrainingEvent
  | CompetitionEvent
  | NoteEvent
  | ActivityEvent;
