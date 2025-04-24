import { cn } from '@/utils/shadcn';
import { ComponentProps, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = Omit<ComponentProps<'input'>, 'onChange'> & {
  name: string;
  label?: string;
  value?: number;
  onChange?: (value: number | undefined) => void;
};

export const RHFDuration = ({
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
          const [hoursInput, setHoursInput] = useState<string>(
            field.value ? Math.floor(field.value / 3600).toString() : '',
          );
          const [minutesInput, setMinutesInput] = useState<string>(
            field.value ? Math.floor((field.value % 3600) / 60).toString() : '',
          );

          useEffect(() => {
            if (field.value === undefined || field.value === null) {
              setHoursInput('');
              setMinutesInput('');
            } else {
              setHoursInput(Math.floor(field.value / 3600).toString());
              setMinutesInput(Math.floor((field.value % 3600) / 60).toString());
            }
          }, [field.value]);

          const updateFormValue = (hours: string, minutes: string) => {
            const hoursNum = hours === '' ? 0 : parseInt(hours, 10);
            const minutesNum = minutes === '' ? 0 : parseInt(minutes, 10);

            if (hours === '' && minutes === '') {
              field.onChange(undefined);
              onChange?.(undefined);
            } else {
              field.onChange(hoursNum * 3600 + minutesNum * 60);
              onChange?.(hoursNum * 3600 + minutesNum * 60);
            }
          };

          return (
            <div className="flex items-center">
              <div className="flex items-center">
                <Input
                  type="number"
                  min={0}
                  value={hoursInput}
                  onChange={(event) => {
                    const newHoursInput = event.target.value;
                    setHoursInput(newHoursInput);
                    updateFormValue(newHoursInput, minutesInput);
                  }}
                  {...other}
                  className={cn(
                    other.className,
                    'rounded-br-none rounded-tr-none',
                    error && 'border-red-500',
                  )}
                />
                <div className="rounded-none border border-l-0 shadow-xs py-1.25 px-3 text-base">
                  <span className="text-md text-gray-500">hours</span>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  min={0}
                  value={minutesInput}
                  onChange={(event) => {
                    const newMinutesInput = event.target.value;
                    setMinutesInput(newMinutesInput);
                    updateFormValue(hoursInput, newMinutesInput);
                  }}
                  {...other}
                  className={cn(
                    other.className,
                    'rounded-none border-l-0',
                    error && 'border-red-500',
                  )}
                />
                <div className="rounded-l-none rounded-r-md border border-l-0 shadow-xs py-1.25 px-3 text-base">
                  <span className="text-md text-gray-500">mins</span>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
