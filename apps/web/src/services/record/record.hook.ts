import { QueryOptions, useQuery } from '@tanstack/react-query';

import { SPORT_TYPE } from '@openathlete/shared';

import { RecordService } from './record.service';

export const useGetMyRecordsQuery = (
  sport?: SPORT_TYPE,
  opt?: QueryOptions<Awaited<ReturnType<typeof RecordService.getMyRecords>>>,
) =>
  useQuery({
    ...opt,
    queryFn: () => RecordService.getMyRecords(sport),
    queryKey: ['RecordService.getMyRecords'],
  });
