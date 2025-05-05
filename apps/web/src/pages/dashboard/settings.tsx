import { m } from '@/paraglide/messages';
import { SettingsView } from '@/views/dashboard/settings-view';

export function SettingsPage() {
  return (
    <>
      <title>{m.settings()}</title>
      <SettingsView />
    </>
  );
}
