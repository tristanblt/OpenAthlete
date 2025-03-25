import { Calendar } from '@/components/calendar/calendar';
import { useGetMyEventsQuery } from '@/services/event';

export function CalendarView() {
  const { data } = useGetMyEventsQuery();

  return (
    <div className="p-8">
      <Calendar events={data} />
    </div>
  );
}
