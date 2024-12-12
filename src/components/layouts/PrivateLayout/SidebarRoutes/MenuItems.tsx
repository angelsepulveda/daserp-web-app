import { TMenuItem } from '@/components/layouts/PrivateLayout/SidebarRoutes/types/menuItem';
import { LayoutDashboard, Settings, Users, FileText } from 'lucide-react';

export const menuItems: TMenuItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    title: 'Configuraciones',
    icon: <Settings className="h-4 w-4" />,
    submenu: [
      {
        title: 'Tipos de documentos',
        href: '/general/document-types',
      },
      {
        title: 'Tipos de comprobantes',
        href: '/general/voucher-types',
      },
    ],
  },
];
