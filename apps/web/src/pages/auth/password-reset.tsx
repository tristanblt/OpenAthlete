import { m } from '@/paraglide/messages';
import { PasswordResetView } from '@/views/auth/password-reset-view';

export function PasswordResetPage() {
  return (
    <>
      <title>{m.password_reset()}</title>
      <PasswordResetView />
    </>
  );
}
