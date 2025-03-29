import { useGetMyAthleteQuery } from '@/services/athlete';
import { useMemo } from 'react';

import { SPORT_TYPE, TRAINING_ZONE_TYPE } from '@openathlete/shared';

export function useTrainingZones(type: TRAINING_ZONE_TYPE, sport?: SPORT_TYPE) {
  const { data: athlete } = useGetMyAthleteQuery();

  const trainingZones = useMemo(
    () => athlete?.trainingZones.filter((zone) => zone.type === type),
    [athlete, type],
  );

  const finalTrainingZones = useMemo(() => {
    return trainingZones?.map((zone) => {
      const values = zone.values.filter((value) => {
        if (sport) {
          return value.sports.includes(sport);
        }
        return true;
      });

      if (values.length === 0) {
        return null;
      }

      return {
        name: zone.name,
        description: zone.description,
        color: zone.color,
        min: values[0].min,
        max: values[0].max,
      };
    });
  }, [trainingZones]);

  return finalTrainingZones?.filter((zone) => zone !== null);
}
