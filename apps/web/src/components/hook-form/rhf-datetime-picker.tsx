import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DateTimePicker } from '../ui/datetime-picker';
import { Label } from '../ui/label';

type Props = Omit<ComponentProps<'input'>, 'onChange'> & {
  name: string;
  label?: string;
  onChange?: (value: Date) => void;
};

export function RHFDateTimePicker({ name, type, label, ...other }: Props) {
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
        render={({ field, fieldState: { error } }) => (
          <DateTimePicker
            {...field}
            {...other}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              other.onChange?.(value);
            }}
            className={error ? 'border-red-500' : ''}
          />
        )}
      />
    </div>
  );
}
