import { m } from '@/paraglide/messages';
import { PasswordResetRequestView } from '@/views/auth/password-reset-request-view';

export function PasswordResetRequestPage() {
  return (
    <>
      <title>{m.password_reset_request()}</title>
      <PasswordResetRequestView />
    </>
  );
}
