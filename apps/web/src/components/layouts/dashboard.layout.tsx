import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '../sidebar/app-sidebar';

interface P {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: P) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
