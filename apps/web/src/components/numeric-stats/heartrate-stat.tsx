import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface P {
  label: string;
  heartrate: number;
}

export function HeartrateStat({ label, heartrate }: P) {
  return (
    <Popover>
      <PopoverTrigger className="text-left">
        <div className="text-sm font-semibold">{label}</div>
        <div>
          {heartrate} <span className="text-gray-500 text-sm">bpm</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>Zone 2</PopoverContent>
    </Popover>
  );
}
