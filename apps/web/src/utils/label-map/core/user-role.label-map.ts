import { m } from '@/paraglide/messages';

import { UserRole } from '@openathlete/shared';

export const userRoleLabelMap: Record<UserRole, string> = {
  ATHLETE: m.athlete(),
  COACH: m.coach(),
};
