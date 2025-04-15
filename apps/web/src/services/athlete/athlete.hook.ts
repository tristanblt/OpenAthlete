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

export const useGetMyCoachedAthletesQuery = (
  opt?: QueryOptions<
    Awaited<ReturnType<typeof AthleteService.getCoachedAthletes>>
  >,
) =>
  useQuery({
    ...opt,
    queryFn: AthleteService.getCoachedAthletes,
    queryKey: ['AthleteService.getCoachedAthletes'],
  });
