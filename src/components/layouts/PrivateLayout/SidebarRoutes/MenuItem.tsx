'use client';

import React, { FC, useState } from 'react';
import { TMenuItem } from '@/components/layouts/PrivateLayout/SidebarRoutes/types/menuItem';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const MenuItem: FC<{ item: TMenuItem; isSubmenu?: boolean }> = ({
  item,
  isSubmenu = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.submenu) {
    return (
      <div className={`${isSubmenu ? 'ml-4' : ''}`}>
        <Button
          variant="ghost"
          className="w-full justify-between font-normal hover:bg-primary hover:text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        {isOpen && (
          <div className="mt-2 space-y-2">
            {item.submenu.map((subItem, index) => (
              <MenuItem key={index} item={subItem} isSubmenu />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start font-normal hover:bg-primary hover:text-primary-foreground ${isSubmenu ? 'ml-4' : ''}`}
      asChild
    >
      <Link href={item.href || '#'}>
        {item.icon}
        <span className="ml-2">{item.title}</span>
      </Link>
    </Button>
  );
};
