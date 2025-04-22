import { useGetMyAthleteQuery } from '@/services/athlete';
import { useMemo } from 'react';

import { SPORT_TYPE, TRAINING_ZONE_TYPE } from '@openathlete/shared';

const DEFAULT_TRAINING_ZONES = [
  {
    type: TRAINING_ZONE_TYPE.HEARTRATE,
    values: [
      {
        name: 'Zone 1',
        description: 'Recovery',
        min: 0,
        max: 131,
        color: 'grey',
      },
      {
        name: 'Zone 2',
        description: 'Endurance',
        min: 132,
        max: 142,
        color: 'green',
      },
      {
        name: 'Zone 3',
        description: 'Tempo',
        min: 143,
        max: 152,
        color: 'yellow',
      },
      {
        name: 'Zone 4',
        description: 'Threshold',
        min: 153,
        max: 163,
        color: 'orange',
      },
      {
        name: 'Zone 5',
        description: 'VO2 Max',
        min: 164,
        max: 220,
        color: 'red',
      },
    ],
  },
];

export function useTrainingZones(type: TRAINING_ZONE_TYPE, sport?: SPORT_TYPE) {
  const { data: athlete } = useGetMyAthleteQuery();

  const trainingZones = useMemo(
    () =>
      athlete?.trainingZones
        .filter((zone) => zone.type === type)
        .sort((a, b) => a.index - b.index),
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

  const filteredTrainingZones = finalTrainingZones
    ?.filter((zone) => zone !== null)
    .map((zone) => zone as Exclude<typeof zone, null>);

  if (!filteredTrainingZones || filteredTrainingZones.length === 0) {
    return DEFAULT_TRAINING_ZONES.find((zone) => zone.type === type)?.values!;
  }

  return filteredTrainingZones;
}
