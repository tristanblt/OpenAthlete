import { formatDistance } from '@openathlete/shared';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  label: string;
  distance: number;
}

export function DistanceStat({ label, distance }: P) {
  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <div className="text-sm font-semibold">{label}</div>
        <div>
          {formatDistance(distance, 'km')}{' '}
          <span className="text-gray-500 text-sm">km</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {formatDistance(distance, 'm')}{' '}
          <span className="text-gray-500 text-sm">m</span>
        </div>
        <div>
          {formatDistance(distance, 'mi')}{' '}
          <span className="text-gray-500 text-sm">mi</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
