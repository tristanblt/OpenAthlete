import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import { SpaceSwitcher } from '@/components/sidebar/space-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { getPath } from '@/routes/paths';
import { Calendar } from 'lucide-react';
import * as React from 'react';

import { UserRole } from '@openathlete/shared';

const sidebarNavigation = [
  {
    title: 'Calendar',
    url: getPath(['dashboard', 'calendar']),
    icon: Calendar,
    spaces: ['ATHLETE', 'COACH'] as UserRole[],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SpaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarNavigation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
