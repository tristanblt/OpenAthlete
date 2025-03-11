import { z } from 'zod';

export const refreshTokenDtoSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenDto = z.infer<typeof refreshTokenDtoSchema>;
