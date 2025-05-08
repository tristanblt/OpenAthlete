import { z } from 'zod';

import { EQUIPMENT_TYPE, SPORT_TYPE } from '../../misc';

export const createEquipmentDtoSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.nativeEnum(EQUIPMENT_TYPE),
  sports: z.array(z.nativeEnum(SPORT_TYPE)),
  isDefault: z.boolean().default(false),
});

export const updateEquipmentDtoSchema = createEquipmentDtoSchema.partial();

export type CreateEquipmentDto = z.infer<typeof createEquipmentDtoSchema>;
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentDtoSchema>;
