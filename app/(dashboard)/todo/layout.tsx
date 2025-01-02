// app/(dashboard)/todo/layout.tsx

import { ReactNode } from 'react';
import DashboardLayout from '../layout'; // Import the dashboard layout, which already includes the navbar

export default function TodoLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>; // Wrap the Todo page content in DashboardLayout
}
