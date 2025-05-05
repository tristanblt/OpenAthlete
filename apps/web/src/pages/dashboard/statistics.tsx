import { LoadingScreen } from '@/components/loading-screen';
import { m } from '@/paraglide/messages';
import { useGetMyAthleteQuery } from '@/services/athlete';
import { StatisticsView } from '@/views/dashboard/statistics-view';

export function StatisticsPage() {
  const { data: athlete } = useGetMyAthleteQuery();

  if (!athlete) {
    return <LoadingScreen />;
  }
  return (
    <>
      <title>{m.statistics()}</title>
      <StatisticsView athleteId={athlete.athleteId} />
    </>
  );
}
