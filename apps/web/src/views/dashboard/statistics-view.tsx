import { StatisticsPeriodSelect } from '@/components/statistics-period-select/statistics-period-select';
import { useGetStatisticsForPeriodQuery } from '@/services/statistics';
import { useState } from 'react';

import {
  formatDistance,
  formatDuration,
  getWeekPeriod,
} from '@openathlete/shared';

interface P {
  athleteId: number;
}

export function StatisticsView({ athleteId }: P) {
  const [period, setPeriod] = useState<{ start: Date; end: Date }>(
    getWeekPeriod(new Date()),
  );
  const { data: statistics } = useGetStatisticsForPeriodQuery(
    athleteId,
    period.start,
    period.end,
  );

  return (
    <div className="p-8">
      <StatisticsPeriodSelect
        onChange={(start, end) => setPeriod({ start, end })}
        period={period}
      />
      {statistics && (
        <>
          <div>Duration: {formatDuration(statistics.duration)}</div>
          <div>Distance: {formatDistance(statistics.distance)}km</div>
          <div>Elevation: {statistics.elevationGain}m</div>
          <div>Count: {statistics.count}</div>
          {statistics.sports.map((sport) => (
            <div key={sport.sport}>
              <div>Sport: {sport.sport}</div>
              <div>Duration: {formatDuration(sport.duration)}</div>
              <div>Distance: {formatDistance(sport.distance)}km</div>
              <div>Elevation: {sport.elevationGain}m</div>
              <div>Count: {sport.count}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
