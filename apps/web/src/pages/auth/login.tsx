import { m } from '@/paraglide/messages';
import { LoginView } from '@/views/auth';

export function LoginPage() {
  return (
    <>
      <title>{m.login()}</title>
      <LoginView />
    </>
  );
}
