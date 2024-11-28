'use client';

import { SidebarRoutesMobile } from '@/components';
import { UserProfileDropdown } from '@/components/layouts/PrivateLayout/Navbar/UserProfileDropdown';

export const Navbar = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center">
        <SidebarRoutesMobile />
      </div>
      <UserProfileDropdown />
    </header>
  );
};
