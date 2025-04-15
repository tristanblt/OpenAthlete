import { UserRole } from '@openathlete/shared';

export type SpaceContextType = {
  space: UserRole;
  setSpace: (space: UserRole) => void;
};
