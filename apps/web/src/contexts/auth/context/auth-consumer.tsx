import { LoadingScreen } from '@/components/loading-screen';

import { AuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

export function AuthConsumer({ children }: Props) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <LoadingScreen /> : children)}
    </AuthContext.Consumer>
  );
}
