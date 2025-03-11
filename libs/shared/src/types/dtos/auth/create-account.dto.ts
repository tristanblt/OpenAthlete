import { z } from 'zod';

export const createAccountDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type CreateAccountDto = z.infer<typeof createAccountDtoSchema>;
