import { cn } from '@/utils/shadcn';
import { ComponentProps, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DistanceUnit } from '@openathlete/shared';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props = ComponentProps<'input'> & {
  name: string;
  label?: string;
  value?: number;
};

const UNIT_CONVERSION = {
  m: 1,
  km: 1000,
  mi: 1609.34,
};

export const RHFDistance = ({
  name,
  type,
  label,
  value,
  onChange,
  ...other
}: Props) => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-3">
      {label && (
        <Label htmlFor={name}>
          {label} {other.required ? '*' : ''}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const [distanceInput, setDistanceInput] = useState<string>('');
          const [unit, setUnit] = useState<DistanceUnit>('km');

          // Convert stored value (in meters) to display value in selected unit
          useEffect(() => {
            if (field.value === undefined || field.value === null) {
              setDistanceInput('');
            } else {
              // Convert from meters to current unit
              const convertedValue = field.value / UNIT_CONVERSION[unit];
              setDistanceInput(convertedValue.toString());
            }
          }, [field.value, unit]);

          const updateFormValue = (distance: string) => {
            if (distance === '') {
              field.onChange(undefined);
            } else {
              // Store the value in meters (base unit)
              const distanceNum = parseFloat(distance);
              field.onChange(distanceNum * UNIT_CONVERSION[unit]);
            }
          };

          // Handle unit change with conversion
          const handleUnitChange = (newUnit: DistanceUnit) => {
            if (distanceInput !== '') {
              // Convert current value to meters
              const valueInMeters =
                parseFloat(distanceInput) * UNIT_CONVERSION[unit];
              // Then convert to new unit
              const convertedValue = valueInMeters / UNIT_CONVERSION[newUnit];
              setDistanceInput(convertedValue.toFixed(2));
            }
            setUnit(newUnit);
          };

          return (
            <div className="flex items-center">
              <Input
                type="number"
                min={0}
                step="any"
                value={distanceInput}
                onChange={(event) => {
                  const newDistanceInput = event.target.value;
                  setDistanceInput(newDistanceInput);
                  updateFormValue(newDistanceInput);
                }}
                {...other}
                className={cn(
                  other.className,
                  'rounded-r-none border-r-0',
                  error && 'border-red-500',
                )}
              />
              <Select value={unit} onValueChange={handleUnitChange}>
                <SelectTrigger className="w-24 rounded-l-none">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">m</SelectItem>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="mi">mi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />
    </div>
  );
};
