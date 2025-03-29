import { ActivityStream } from '@openathlete/shared';

import { SimpleElevationChart } from '../charts/simple-elevation-chart';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  label: string;
  elevation: number;
  altitudeStream?: ActivityStream['altitude'];
}

export function ElevationStat({ label, elevation, altitudeStream }: P) {
  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <div className="text-sm font-semibold">{label}</div>
        <div>
          {elevation} <span className="text-gray-500 text-sm">m</span>
        </div>
      </PopoverTrigger>
      {altitudeStream && (
        <PopoverContent>
          <SimpleElevationChart altitudeStream={altitudeStream} />
        </PopoverContent>
      )}
    </Popover>
  );
}
