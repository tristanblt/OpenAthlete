import { useContext } from 'react';

import { SpaceContext } from '../context/space-context';

export const useSpaceContext = () => {
  const context = useContext(SpaceContext);

  if (!context)
    throw new Error('useSpaceContext context must be use inside SpaceProvider');

  return context;
};
