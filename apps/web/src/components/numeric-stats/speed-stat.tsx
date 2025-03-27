import { formatSpeed } from '@openathlete/shared';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  label: string;
  speed: number;
}

export function SpeedStat({ label, speed }: P) {
  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <div className="text-sm font-semibold">{label}</div>
        <div>
          {formatSpeed(speed, 'min/km')}{' '}
          <span className="text-gray-500 text-sm">/ km</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {formatSpeed(speed, 'm/s')}{' '}
          <span className="text-gray-500 text-sm">m/s</span>
        </div>
        <div>
          {formatSpeed(speed, 'km/h')}{' '}
          <span className="text-gray-500 text-sm">km/h</span>
        </div>
        <div>
          {formatSpeed(speed, 'mph')}{' '}
          <span className="text-gray-500 text-sm">mph</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
