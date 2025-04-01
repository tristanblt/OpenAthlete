import { cn } from '@/utils/shadcn';
import { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props = ComponentProps<'select'> & {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export const RHFSelect = ({ name, label, placeholder, ...other }: Props) => {
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
          <Select
            {...field}
            value={
              field.value === undefined || field.value === null
                ? ''
                : field.value
            }
            onValueChange={(value) => {
              field.onChange(value);
            }}
            {...other}
            dir={undefined}
          >
            <SelectTrigger
              className={cn(
                other.className,
                'w-full',
                error && 'border-red-500',
              )}
            >
              <SelectValue placeholder={placeholder || label} />
            </SelectTrigger>
            <SelectContent>{other.children}</SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
