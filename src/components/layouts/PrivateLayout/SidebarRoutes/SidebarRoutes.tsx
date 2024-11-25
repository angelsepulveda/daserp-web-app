import { ScrollArea } from '@/components';
import { menuItems } from '@/components/layouts/PrivateLayout/SidebarRoutes/MenuItems';
import { MenuItem } from '@/components/layouts/PrivateLayout/SidebarRoutes/MenuItem';

export const SidebarRoutes = () => {
  return (
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
  );
};
