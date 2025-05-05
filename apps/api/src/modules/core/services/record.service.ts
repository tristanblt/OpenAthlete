import { Injectable } from '@nestjs/common';

import { record, sport_type } from '@openathlete/database';
import { keysToCamel } from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async getMyRecords(user: AuthUser, sport?: sport_type): Promise<record[]> {
    const records = await this.prisma.record.findMany({
      where: {
        athlete: {
          user: {
            user_id: user.user_id,
          },
        },
        ...(sport && {
          event_activity: {
            sport,
          },
        }),
      },
    });

    const bestRecords = records.reduce(
      (acc, record) => {
        const { type, distance } = record;
        if (!acc[type]) {
          acc[type] = {};
        }
        if (!acc[type][distance]) {
          acc[type][distance] = record;
        } else {
          if (record.type === 'SPEED') {
            if (record.value < acc[type][distance].value) {
              acc[type][distance] = record;
            }
          } else {
            if (record.value > acc[type][distance].value) {
              acc[type][distance] = record;
            }
          }
        }
        return acc;
      },
      {} as Record<string, Record<string, record>>,
    );

    const bestRecordsArray = Object.values(bestRecords).flatMap((type) =>
      Object.values(type),
    );

    return keysToCamel(bestRecordsArray);
  }
}
