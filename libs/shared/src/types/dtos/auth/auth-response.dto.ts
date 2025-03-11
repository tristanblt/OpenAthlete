import { z } from 'zod';

export const authResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthResponseDto = z.infer<typeof authResponseDtoSchema>;
