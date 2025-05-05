import client, { routes } from '@/utils/axios';

import { Record, SPORT_TYPE } from '@openathlete/shared';

export class RecordService {
  static async getMyRecords(sport?: SPORT_TYPE): Promise<Record[]> {
    const res = await client.get(routes.record.getMyRecords, {
      params: {
        sport,
      },
    });
    return res.data;
  }
}
