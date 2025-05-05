import { m } from '@/paraglide/messages';

import { formatDuration } from '@openathlete/shared';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  label?: string;
  duration: number;
  movingDuration?: number;
}

export function DurationStat({ label, duration, movingDuration }: P) {
  const shouldShowPopover = movingDuration;

  return (
    <Popover>
      <PopoverTrigger className="text-left">
        {label && <div className="text-sm font-semibold">{label}</div>}
        <div>{formatDuration(duration)}</div>
      </PopoverTrigger>
      {shouldShowPopover && (
        <PopoverContent>
          {movingDuration && (
            <div>
              {m.moving_time()}: <b>{formatDuration(movingDuration)}</b>
            </div>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
}
