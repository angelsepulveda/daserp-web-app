import { TMenuItem } from '@/components/layouts/PrivateLayout/SidebarRoutes/types/menuItem';
import { LayoutDashboard, Settings, Users, FileText } from 'lucide-react';

export const menuItems: TMenuItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    title: 'User Management',
    icon: <Users className="h-4 w-4" />,
    submenu: [
      {
        title: 'All Users',
        href: '/users',
      },
      {
        title: 'Add User',
        href: '/users/add',
      },
      {
        title: 'User Roles',
        href: '/users/roles',
      },
    ],
  },
  {
    title: 'Content',
    icon: <FileText className="h-4 w-4" />,
    submenu: [
      {
        title: 'Pages',
        href: '/content/pages',
      },
      {
        title: 'Articles',
        href: '/content/articles',
      },
      {
        title: 'Categories',
        submenu: [
          {
            title: 'Main Categories',
            href: '/content/categories/main',
          },
          {
            title: 'Subcategories',
            href: '/content/categories/sub',
          },
        ],
      },
    ],
  },
  {
    title: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    href: '/settings',
  },
];
