import { Injectable, NotFoundException } from '@nestjs/common';

import { equipment, equipment_type, sport_type } from '@openathlete/database';
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
  keysToCamel,
} from '@openathlete/shared';

import { AuthUser } from 'src/modules/auth/decorators/user.decorator';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async createEquipment(
    user: AuthUser,
    dto: CreateEquipmentDto,
  ): Promise<equipment> {
    const athlete = await this.prisma.athlete.findFirst({
      where: {
        user: {
          user_id: user.user_id,
        },
      },
      select: {
        athlete_id: true,
      },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    if (dto.isDefault) {
      await this.prisma.equipment.updateMany({
        where: {
          athlete_id: athlete.athlete_id,
          sports: {
            hasSome: dto.sports,
          },
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }

    return keysToCamel(
      await this.prisma.equipment.create({
        data: {
          name: dto.name,
          type: dto.type as equipment_type,
          sports: dto.sports as sport_type[],
          is_default: dto.isDefault,
          athlete: {
            connect: {
              athlete_id: athlete.athlete_id,
            },
          },
        },
      }),
    );
  }

  async updateEquipment(
    user: AuthUser,
    equipmentId: number,
    dto: UpdateEquipmentDto,
  ): Promise<equipment> {
    const athlete = await this.prisma.athlete.findFirst({
      where: {
        user: {
          user_id: user.user_id,
        },
      },
      select: {
        athlete_id: true,
      },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    const equipment = await this.prisma.equipment.findFirst({
      where: {
        equipment_id: equipmentId,
        athlete_id: athlete.athlete_id,
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    if (dto.isDefault) {
      await this.prisma.equipment.updateMany({
        where: {
          athlete_id: athlete.athlete_id,
          equipment_id: {
            not: equipmentId,
          },
          sports: {
            hasSome: dto.sports || equipment.sports,
          },
          is_default: true,
        },
        data: {
          is_default: false,
        },
      });
    }

    return keysToCamel(
      await this.prisma.equipment.update({
        where: {
          equipment_id: equipmentId,
        },
        data: {
          name: dto.name,
          type: dto.type as equipment_type,
          sports: dto.sports as sport_type[],
          is_default: dto.isDefault,
        },
      }),
    );
  }

  async deleteEquipment(user: AuthUser, equipmentId: number): Promise<void> {
    const athlete = await this.prisma.athlete.findFirst({
      where: {
        user: {
          user_id: user.user_id,
        },
      },
      select: {
        athlete_id: true,
      },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    const equipment = await this.prisma.equipment.findFirst({
      where: {
        equipment_id: equipmentId,
        athlete_id: athlete.athlete_id,
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    await this.prisma.equipment.delete({
      where: {
        equipment_id: equipmentId,
      },
    });
  }

  async getMyEquipment(user: AuthUser): Promise<equipment[]> {
    const athlete = await this.prisma.athlete.findFirst({
      where: {
        user: {
          user_id: user.user_id,
        },
      },
      select: {
        athlete_id: true,
      },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    return keysToCamel(
      await this.prisma.equipment.findMany({
        where: {
          athlete_id: athlete.athlete_id,
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
    );
  }

  async getDefaultEquipmentForSport(
    user: AuthUser,
    sport: sport_type,
  ): Promise<equipment | null> {
    const athlete = await this.prisma.athlete.findFirst({
      where: {
        user: {
          user_id: user.user_id,
        },
      },
      select: {
        athlete_id: true,
      },
    });

    if (!athlete) {
      throw new NotFoundException('Athlete not found');
    }

    return keysToCamel(
      await this.prisma.equipment.findFirst({
        where: {
          athlete_id: athlete.athlete_id,
          sports: {
            has: sport,
          },
          is_default: true,
        },
      }),
    );
  }
}
