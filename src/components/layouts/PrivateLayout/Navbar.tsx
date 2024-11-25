'use client';

import { Input, Sheet, SheetContent, SheetTrigger } from '@/components';
import { Menu, Search } from 'lucide-react';
import { SidebarRoutes } from '@/components/layouts/PrivateLayout/SidebarRoutes';

export const Navbar = () => {
  return (
    <div className="flex h-20 w-full items-center justify-between gap-x-4 border-b bg-background px-2 md:px-6">
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]">
        <Input placeholder="Buscar..." className="rounded-lg" />
        <Search strokeWidth={1} className="absolute right-2 top-2" />
      </div>
      <div className="flex items-center gap-x-2">
        <p>toggle theme</p>
      </div>
    </div>
  );
};
