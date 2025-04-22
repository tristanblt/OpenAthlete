import {
  athlete,
  connector_provider,
  event,
  event_activity,
  event_competition,
  event_note,
  event_template,
  event_training,
  training_zone,
  training_zone_value,
  user,
  user_role,
} from '@openathlete/database';

import { EVENT_TYPE, SPORT_TYPE } from '../types/misc';
import { ConvertKeysToCamelCase } from '../utils/data.mapper';

export type UserRole = ConvertKeysToCamelCase<user_role>;

export type ConnectorProvider = ConvertKeysToCamelCase<connector_provider>;

export type TrainingZone = ConvertKeysToCamelCase<training_zone>;

export type TrainingZoneValue = ConvertKeysToCamelCase<training_zone_value>;

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
  sport: SPORT_TYPE;
  relatedActivity?: ActivityEvent;
}

export interface CompetitionEvent
  extends ConvertKeysToCamelCase<event & event_competition> {
  type: EVENT_TYPE.COMPETITION;
  sport: SPORT_TYPE;
  relatedActivity?: ActivityEvent;
}

export interface NoteEvent extends ConvertKeysToCamelCase<event_note & event> {
  type: EVENT_TYPE.NOTE;
}

export interface ActivityEvent
  extends ConvertKeysToCamelCase<event & event_activity> {
  type: EVENT_TYPE.ACTIVITY;
  sport: SPORT_TYPE;
}

export type Event =
  | TrainingEvent
  | CompetitionEvent
  | NoteEvent
  | ActivityEvent;

export interface EventTemplate extends ConvertKeysToCamelCase<event_template> {
  event?: Event;
}
