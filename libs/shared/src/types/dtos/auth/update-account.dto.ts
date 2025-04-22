import { z } from 'zod';

export const updateAccountDtoSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UpdateAccountDto = z.infer<typeof updateAccountDtoSchema>;
