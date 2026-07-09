import React from 'react';
import { ManageSidebar } from '@/components/manage/ManageSidebar';
import { Topbar } from '@/components/layout/Topbar';

export const metadata = {
  title: 'Pipeline Data Manager | Pharma Dashboard',
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
      <Topbar />
      
      <div className="flex-1 flex overflow-hidden pt-16">
        <ManageSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
