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
import { Calendar, PieChart } from 'lucide-react';
import * as React from 'react';

const sidebarNavigation = [
  {
    title: 'Calendar',
    url: getPath(['dashboard', 'calendar']),
    icon: Calendar,
  },
  {
    title: 'Statistics',
    url: '#',
    icon: PieChart,
    isActive: true,
    items: [
      {
        title: 'History',
        url: '#',
      },
    ],
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
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
