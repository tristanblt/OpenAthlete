import { m } from '@/paraglide/messages';
import { useGetMyEquipmentQuery } from '@/services/equipment';
import { sportTypeLabelMap } from '@/utils/label-map/core';

import { EQUIPMENT_TYPE } from '@openathlete/shared';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  equipmentId: number;
}

export function EquipmentStat({ equipmentId }: P) {
  const { data: equipment = [] } = useGetMyEquipmentQuery();
  const equipmentItem = equipment.find((e) => e.equipmentId === equipmentId);

  if (!equipmentItem) return null;

  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <div className="text-sm font-semibold">{m.equipment()}</div>
        <div>{equipmentItem.name}</div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <div>
            {m.total_distance()}:{' '}
            <span className="text-gray-500 text-sm">
              {(equipmentItem.totalDistance / 1000).toFixed(1)} km
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
