'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Pill, 
  Stethoscope, 
  Microscope, 
  Calendar, 
  Activity 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Companies', href: '/manage/companies', icon: Building2 },
  { name: 'Drugs', href: '/manage/drugs', icon: Pill },
  { name: 'Drug Indications', href: '/manage/indications', icon: Stethoscope },
  { name: 'Clinical Trials', href: '/manage/trials', icon: Microscope },
  { name: 'Upcoming Events', href: '/manage/events', icon: Calendar },
  { name: 'Drug Updates', href: '/manage/updates', icon: Activity },
];

export function ManageSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-slate-200 h-full flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Data Manager</h2>
        <p className="text-xs text-slate-500">Pipeline Administration</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-[var(--color-brand-primary)] text-white" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon 
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5",
                  isActive ? "text-white" : "text-slate-400"
                )} 
                aria-hidden="true" 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
