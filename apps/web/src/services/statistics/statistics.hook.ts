import { QueryOptions, useQuery } from '@tanstack/react-query';

import { StatisticsService } from './statistics.service';

export const useGetStatisticsForPeriodQuery = (
  athleteId: number,
  startDate: Date,
  endDate: Date,
  opt?: QueryOptions<
    Awaited<ReturnType<typeof StatisticsService.getStatisticsForPeriod>>
  >,
) =>
  useQuery({
    ...opt,
    queryFn: () =>
      StatisticsService.getStatisticsForPeriod(athleteId, startDate, endDate),
    queryKey: [
      'StatisticsService.getStatisticsForPeriod',
      athleteId,
      startDate,
      endDate,
    ],
  });
