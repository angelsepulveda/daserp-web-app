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
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  );
}
