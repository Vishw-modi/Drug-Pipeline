'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Beaker, Building2, FlaskConical, CalendarClock, Settings, FileText, Download, BookOpen, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const isRouteActive = (route: string) => pathname === route;

  return (
    <aside className="w-64 bg-[var(--color-brand-navy)] text-slate-300 flex flex-col h-screen fixed top-0 left-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="text-[var(--color-brand-primary)]" />
          KMK Pipeline
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-6">
        <div>
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Therapeutic Areas</p>
          <div className="space-y-1">
            <Link href="/" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/') ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white")}>
              <LayoutDashboard size={18} />
              <span>Oncology</span>
            </Link>
            {['Immunology', 'Neurology', 'Cardiovascular', 'Rare Disease', 'Endocrinology', 'Infectious Disease'].map(area => (
              <div key={area} className="flex items-center gap-3 px-2 py-2 rounded-md opacity-50 cursor-not-allowed">
                <div className="w-[18px]" />
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Analytics</p>
          <div className="space-y-1">
            <Link href="/pipeline" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/pipeline') ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white")}>
              <Beaker size={18} />
              <span>Pipeline Explorer</span>
            </Link>
            <Link href="/companies" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/companies') ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white")}>
              <Building2 size={18} />
              <span>Comparative Analysis</span>
            </Link>
            <Link href="/trials" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/trials') ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white")}>
              <FlaskConical size={18} />
              <span>Market Insights</span>
            </Link>
            <Link href="/catalysts" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/catalysts') ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white")}>
              <CalendarClock size={18} />
              <span>Upcoming Catalysts</span>
            </Link>
          </div>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Resources</p>
          <div className="space-y-1">
            <Link href="/reports" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800/50 hover:text-white transition-colors">
              <FileText size={18} />
              <span>Reports</span>
            </Link>
            <Link href="/downloads" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800/50 hover:text-white transition-colors">
              <Download size={18} />
              <span>Downloads</span>
            </Link>
            <Link href="/glossary" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800/50 hover:text-white transition-colors">
              <BookOpen size={18} />
              <span>Glossary</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800/50 hover:text-white transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
