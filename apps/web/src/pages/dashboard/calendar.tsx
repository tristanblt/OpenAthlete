import { m } from '@/paraglide/messages';
import { CalendarView } from '@/views/dashboard/calendar-view';

export function CalendarPage() {
  return (
    <>
      <title>{m.calendar()}</title>
      <CalendarView />
    </>
  );
}
