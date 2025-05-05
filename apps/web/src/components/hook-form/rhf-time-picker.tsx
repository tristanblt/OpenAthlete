import { ComponentProps, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '../ui/label';
import { TimePicker } from '../ui/time-picker';

type Props = Omit<ComponentProps<'input'>, 'onChange'> & {
  name: string;
  label?: string;
  onChange?: (value?: Date) => void;
};

export function RHFTimePicker({ name, type, label, ...other }: Props) {
  const { control } = useFormContext();
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

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
          <div className="flex items-end gap-2">
            <TimePicker
              picker="hours"
              date={field.value}
              setDate={(value) => {
                field.onChange(value);
                other.onChange?.(value);
              }}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
              className={error ? 'border-red-500' : ''}
            />
            <TimePicker
              picker="minutes"
              date={field.value}
              setDate={(value) => {
                field.onChange(value);
                other.onChange?.(value);
              }}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
              className={error ? 'border-red-500' : ''}
            />
            <TimePicker
              picker="seconds"
              date={field.value}
              setDate={(value) => {
                field.onChange(value);
                other.onChange?.(value);
              }}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
              className={error ? 'border-red-500' : ''}
            />
          </div>
        )}
      />
    </div>
  );
}
