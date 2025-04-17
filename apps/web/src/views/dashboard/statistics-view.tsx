import { LoadingScreen } from '@/components/loading-screen';
import { useGetStatisticsForPeriodQuery } from '@/services/statistics';

import { formatDistance, formatDuration } from '@openathlete/shared';

interface P {
  athleteId: number;
}

export function StatisticsView({ athleteId }: P) {
  const { data: statistics } = useGetStatisticsForPeriodQuery(
    athleteId,
    new Date('2023-01-01'),
    new Date('2026-12-31'),
  );

  if (!statistics) {
    return <LoadingScreen />;
  }
  return (
    <div className="p-8">
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
    </div>
  );
}
