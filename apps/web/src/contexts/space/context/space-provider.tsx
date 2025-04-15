/* eslint-disable no-console */
import { useMemo, useState } from 'react';

import { UserRole } from '@openathlete/shared';

import { SpaceContextType } from '../types';
import { SpaceContext } from './space-context';

type Props = {
  children: React.ReactNode;
};

export function SpaceProvider({ children }: Props) {
  const [currentSpace, setCurrentSpace] = useState<UserRole>('ATHLETE');

  const memoizedValue = useMemo<SpaceContextType>(
    () => ({
      space: currentSpace,
      setSpace: (space: UserRole) => {
        setCurrentSpace(space);
      },
    }),
    [currentSpace],
  );

  return (
    <SpaceContext.Provider value={memoizedValue}>
      {children}
    </SpaceContext.Provider>
  );
}
