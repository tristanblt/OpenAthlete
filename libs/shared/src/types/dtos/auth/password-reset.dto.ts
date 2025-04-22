import { z } from 'zod';

export const passwordResetRequestSchema = z.object({
  email: z.string().email(),
});

export type PasswordResetRequestDto = z.infer<
  typeof passwordResetRequestSchema
>;

export const passwordResetSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export type PasswordResetDto = z.infer<typeof passwordResetSchema>;
