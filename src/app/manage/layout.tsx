import React from 'react';
import { ManageSidebar } from '@/components/manage/ManageSidebar';
import { Topbar } from '@/components/layout/Topbar';

export const metadata = {
  title: 'Pipeline Data Manager | Pharma Dashboard',
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col overflow-hidden -m-6">
      <div className="flex-1 flex overflow-hidden">
        <ManageSidebar />
        
        <main className="flex-1 flex flex-col overflow-y-auto bg-[var(--color-bg)]">
          {children}
        </main>
      </div>
    </div>
  );
}
