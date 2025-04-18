import { formatDistance, formatDuration } from '@openathlete/shared';

import { Card, CardContent } from '../ui/card';

interface P {
  duration: number;
  distance: number;
  elevationGain: number;
  count: number;
  className?: string;
}

export function StatisticsGlobals({
  duration,
  distance,
  elevationGain,
  count,
  className,
}: P) {
  return (
    <Card className={className}>
      <CardContent className="flex gap-6">
        <div className="text-2xl font-bold">{formatDuration(duration)}</div>
        <div className="text-2xl font-bold">
          {formatDistance(distance)}{' '}
          <span className="text-xl text-gray-500">km</span>
        </div>
        <div className="text-2xl font-bold">
          {elevationGain} <span className="text-xl text-gray-500">d+</span>
        </div>
        <div className="text-2xl font-bold">
          {count}{' '}
          <span className="text-xl text-gray-500">
            activit{count > 1 ? 'ies' : 'y'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
