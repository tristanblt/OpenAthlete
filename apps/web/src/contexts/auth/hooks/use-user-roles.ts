import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

export const useUserType = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext context must be use inside AuthProvider');

  return context.user?.roles;
};
