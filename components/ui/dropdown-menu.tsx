// components/ui/dropdown-menu.tsx

import * as React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="dropdown-menu">{children}</div>;
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return <div className="dropdown-menu-trigger">{children}</div>;
}

export function DropdownMenuContent({ children, align }: { children: React.ReactNode, align: string }) {
  return <div className={`dropdown-menu-content ${align}`}>{children}</div>;
}

export function DropdownMenuItem({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <div className="dropdown-menu-item" onClick={onClick}>
      {children}
    </div>
  );
}
