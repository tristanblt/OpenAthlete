import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUserRoles } from '@/contexts/auth';
import { AudioWaveform, ChevronsUpDown, Command } from 'lucide-react';
import * as React from 'react';

import { UserRole } from '@openathlete/shared';

export function SpaceSwitcher() {
  const roles = useUserRoles();
  const { isMobile } = useSidebar();
  const [activeRole, setActiveRole] = React.useState<UserRole | undefined>(
    roles?.[0],
  );

  React.useEffect(() => {
    setActiveRole(roles?.[0]);
  }, [roles]);

  const spaces = React.useMemo<
    { role: UserRole; name: string; logo: React.ElementType }[]
  >(
    () =>
      roles?.map((role) => {
        switch (role) {
          case 'ATHLETE':
            return {
              role: 'ATHLETE',
              name: 'Athlete',
              logo: AudioWaveform,
            };
          case 'COACH':
            return {
              role: 'COACH',
              name: 'Coach',
              logo: Command,
            };
        }
      }) || [],
    [roles],
  );

  const activeSpace = spaces.find((space) => space.role === activeRole);

  if (!activeSpace) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeSpace.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeSpace.name}</span>
                {/* <span className="truncate text-xs">{activeSpace.plan}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Spaces
            </DropdownMenuLabel>
            {spaces.map((space, index) => (
              <DropdownMenuItem
                key={space.name}
                onClick={() => setActiveRole(space.role)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-xs border">
                  <space.logo className="size-4 shrink-0" />
                </div>
                {space.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
