import { m } from '@/paraglide/messages';
import { sportTypeLabelMap } from '@/utils/label-map/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  CreateEquipmentDto,
  EQUIPMENT_TYPE,
  SPORT_TYPE,
  createEquipmentDtoSchema,
} from '@openathlete/shared';

import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from '../hook-form';
import { Button } from '../ui/button';
import { SelectItem } from '../ui/select';

interface P {
  onSubmit: (values: CreateEquipmentDto) => void;
  defaultValues?: CreateEquipmentDto;
  className?: string;
}

export function EquipmentForm({ onSubmit, defaultValues, className }: P) {
  const methods = useForm<CreateEquipmentDto>({
    resolver: zodResolver(createEquipmentDtoSchema),
    defaultValues: defaultValues || {
      name: '',
      type: EQUIPMENT_TYPE.SHOE,
      sports: [],
      isDefault: false,
    },
  });

  const { handleSubmit } = methods;

  const onFormSubmit = handleSubmit(async (data) => {
    onSubmit(data);
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={onFormSubmit}
      className={className}
    >
      <div className="space-y-4">
        <RHFTextField
          name="name"
          type="text"
          placeholder={m.equipment_name()}
          label={m.name()}
          required
        />

        <RHFSelect
          name="type"
          label={m.type()}
          required
          placeholder={m.select_type()}
        >
          <SelectItem value={EQUIPMENT_TYPE.SHOE}>{m.shoe()}</SelectItem>
          <SelectItem value={EQUIPMENT_TYPE.BIKE}>{m.bike()}</SelectItem>
        </RHFSelect>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            {m.sports()}
          </label>
          <div className="space-y-2">
            {Object.values(SPORT_TYPE).map((sport) => (
              <RHFCheckbox
                key={sport}
                name="sports"
                value={sport}
                label={sportTypeLabelMap[sport]}
              />
            ))}
          </div>
        </div>

        <RHFCheckbox name="isDefault" label={m.default_equipment()} />

        <Button type="submit" className="w-full">
          {defaultValues ? m.update() : m.create()}
        </Button>
      </div>
    </FormProvider>
  );
}
