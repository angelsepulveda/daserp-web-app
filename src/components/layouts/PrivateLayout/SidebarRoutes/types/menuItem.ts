import { ReactNode } from 'react';

export type TMenuItem = {
  title: string;
  icon?: ReactNode;
  href?: string;
  submenu?: TMenuItem[];
};
