import { Calendar } from '@/components/calendar/calendar';
import { useSpaceContext } from '@/contexts/space';
import { useGetMyEventsQuery } from '@/services/event';
import { useEffect } from 'react';

export function CalendarView() {
  const { space } = useSpaceContext();
  const { data, refetch } = useGetMyEventsQuery(
    space === 'COACH' ? true : undefined,
  );

  useEffect(() => {
    refetch();
  }, [space, refetch]);

  return (
    <div className="p-8">
      <Calendar events={data} />
    </div>
  );
}
