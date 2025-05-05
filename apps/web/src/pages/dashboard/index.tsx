import { m } from '@/paraglide/messages';
import { DashboardView } from '@/views/dashboard';

export function DashboardPage() {
  return (
    <>
      <title>{m.dashboard()}</title>
      <DashboardView />
    </>
  );
}
