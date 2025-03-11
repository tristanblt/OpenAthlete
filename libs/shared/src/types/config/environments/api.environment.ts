import { z } from 'zod';

import { ENV } from '../environment.enum';
import { NODE_ENV } from '../node-environment.enum';

export const ApiEnvSchema = z.object({
  ENV: z.nativeEnum(ENV),
  NODE_ENV: z.nativeEnum(NODE_ENV),
  SERVER_PORT: z.string().nonempty(),
  HASH_PEPPER: z.string().nonempty(),
  JWT_SECRET_KEY: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
});

export type ApiEnvSchemaType = z.infer<typeof ApiEnvSchema>;
