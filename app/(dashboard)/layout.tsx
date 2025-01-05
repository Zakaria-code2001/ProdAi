import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">

      {/* Sidebar and Main Content */}
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
