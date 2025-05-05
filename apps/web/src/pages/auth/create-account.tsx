import { m } from '@/paraglide/messages';
import { CreateAccountView } from '@/views/auth/create-account-view';

export function CreateAccountPage() {
  return (
    <>
      <title>{m.create_account()}</title>
      <CreateAccountView />
    </>
  );
}
