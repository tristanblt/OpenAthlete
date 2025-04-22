import { z } from 'zod';

export const createEventTemplateSchema = z.object({
  eventId: z.number().int(),
});

export type CreateEventTemplateDto = z.infer<typeof createEventTemplateSchema>;
