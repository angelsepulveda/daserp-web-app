import { ReactNode } from 'react';
import { Navbar, SidebarRoutesDesktop } from '@/components';

type TPrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: TPrivateLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarRoutesDesktop />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
