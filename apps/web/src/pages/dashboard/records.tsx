import { m } from '@/paraglide/messages';
import { RecordsView } from '@/views/dashboard/records-view';

export function RecordsPage() {
  return (
    <>
      <title>{m.records()}</title>
      <RecordsView />
    </>
  );
}
