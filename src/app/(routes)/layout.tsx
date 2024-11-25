import { ReactNode } from 'react';
import { Navbar } from '@/components';

type TPrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: TPrivateLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <div className="hidden h-full w-64 xl:fixed xl:block">sidebar</div>
      <div className="w-full xl:ml-64">
        <Navbar />
        <div className="bg-[#fafbfc] p-0 dark:bg-secondary">{children}</div>
      </div>
    </div>
  );
}
