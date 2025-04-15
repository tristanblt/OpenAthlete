import client, { routes } from '@/utils/axios';

import { Athlete, TrainingZone, TrainingZoneValue } from '@openathlete/shared';

export class AthleteService {
  static async getMyAthlete(): Promise<
    Athlete & {
      trainingZones: (TrainingZone & {
        values: TrainingZoneValue[];
      })[];
    }
  > {
    const res = await client.get(routes.athlete.getMyAthlete);
    return res.data;
  }

  static async getCoachedAthletes(): Promise<
    (Athlete & {
      trainingZones: (TrainingZone & {
        values: TrainingZoneValue[];
      })[];
    })[]
  > {
    const res = await client.get(routes.athlete.getCoachedAthletes);
    return res.data;
  }
}
