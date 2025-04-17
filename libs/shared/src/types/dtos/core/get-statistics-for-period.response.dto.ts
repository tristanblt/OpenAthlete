import z from 'zod';

import { SPORT_TYPE } from '../../misc';

export const getStatisticsForPeriodSchema = z.object({
  duration: z.number(),
  distance: z.number(),
  elevationGain: z.number(),
  count: z.number(),
  sports: z.array(
    z.object({
      sport: z.nativeEnum(SPORT_TYPE),
      duration: z.number(),
      distance: z.number(),
      elevationGain: z.number(),
      count: z.number(),
    }),
  ),
});

export type GetStatisticsForPeriodDto = z.infer<
  typeof getStatisticsForPeriodSchema
>;
