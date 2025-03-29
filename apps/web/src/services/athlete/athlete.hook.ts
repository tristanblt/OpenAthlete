import { QueryOptions, useQuery } from '@tanstack/react-query';

import { AthleteService } from './athlete.service';

export const useGetMyAthleteQuery = (
  opt?: QueryOptions<Awaited<ReturnType<typeof AthleteService.getMyAthlete>>>,
) =>
  useQuery({
    ...opt,
    queryFn: AthleteService.getMyAthlete,
    queryKey: ['AthleteService.getMyAthlete'],
  });
