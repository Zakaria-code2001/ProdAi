import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ReactNode } from 'react';
import NavbarLogged from '@/components/ui/navbar_logged';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarLogged />
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
