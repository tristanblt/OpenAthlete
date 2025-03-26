import { z } from 'zod';

import { EVENT_TYPE } from '../../misc';

const baseEventSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  name: z.string(),
  athleteId: z.number().optional(),
});

const trainingEventSchema = baseEventSchema.extend({
  type: z.literal(EVENT_TYPE.TRAINING),
});

const competitionEventSchema = baseEventSchema.extend({
  type: z.literal(EVENT_TYPE.COMPETITION),
});

const noteEventSchema = baseEventSchema.extend({
  type: z.literal(EVENT_TYPE.NOTE),
});

const activityEventSchema = baseEventSchema.extend({
  type: z.literal(EVENT_TYPE.ACTIVITY),
});

export const createEventDtoSchema = z.discriminatedUnion('type', [
  trainingEventSchema,
  competitionEventSchema,
  noteEventSchema,
  activityEventSchema,
]);

export type CreateEventDto = z.infer<typeof createEventDtoSchema>;
