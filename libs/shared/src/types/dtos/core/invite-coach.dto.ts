import { z } from 'zod';

export const inviteCoachSchema = z.object({
  email: z.string().email(),
});

export type InviteCoachDto = z.infer<typeof inviteCoachSchema>;
