import { LoadingScreen } from '@/components/loading-screen';
import { useGetMyAthleteQuery } from '@/services/athlete';
import { StatisticsView } from '@/views/dashboard/statistics-view';

export function StatisticsPage() {
  const { data: athlete } = useGetMyAthleteQuery();

  if (!athlete) {
    return <LoadingScreen />;
  }
  return (
    <>
      <title>Statistics</title>
      <StatisticsView athleteId={athlete.athleteId} />
    </>
  );
}
