'use client';

import { Button, ScrollArea, Sheet, SheetContent, SheetTrigger } from '@/components';
import { Menu } from 'lucide-react';
import { menuItems } from '@/components/layouts/PrivateLayout/SidebarRoutes/MenuItems';
import { MenuItem } from '@/components/layouts/PrivateLayout/SidebarRoutes/MenuItem';

export const SidebarRoutesMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <ScrollArea className="h-full py-6">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <MenuItem key={index} item={item} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
