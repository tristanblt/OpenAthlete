import { AthleteCalendarView } from '@/views/dashboard/athlete-calendar-view';
import { useParams } from 'react-router-dom';

export function AthleteCalendarPage() {
  const { athleteId } = useParams();

  return (
    <>
      <title>Athlete Calendar</title>
      <AthleteCalendarView athleteId={Number(athleteId)} />
    </>
  );
}
