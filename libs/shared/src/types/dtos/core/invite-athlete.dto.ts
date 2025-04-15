import { z } from 'zod';

export const inviteAthleteSchema = z.object({
  email: z.string().email(),
});

export type InviteAthleteDto = z.infer<typeof inviteAthleteSchema>;
