'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Beaker, Building2, FlaskConical, CalendarClock, Settings, FileText, Download, BookOpen, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const isRouteActive = (route: string) => pathname === route;

  return (
    <aside className="w-56 bg-surface border-r border-border text-muted flex flex-col h-screen fixed top-0 left-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="p-4">
        <h1 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <Activity className="text-brand-primary" />
          KMK Pipeline
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-6">
        <div>
          <p className="px-2 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Therapeutic Areas</p>
          <div className="space-y-1">
            <Link href="/" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-slate-100 hover:text-brand-navy")}>
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
          <p className="px-2 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Analytics</p>
          <div className="space-y-1">
            <Link href="/pipeline" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/pipeline') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-slate-100 hover:text-brand-navy")}>
              <Beaker size={18} />
              <span>Pipeline Explorer</span>
            </Link>
            <Link href="/companies" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/companies') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-slate-100 hover:text-brand-navy")}>
              <Building2 size={18} />
              <span>Comparative Analysis</span>
            </Link>
            <Link href="/trials" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/trials') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-slate-100 hover:text-brand-navy")}>
              <FlaskConical size={18} />
              <span>Market Insights</span>
            </Link>
            <Link href="/catalysts" className={cn("flex items-center gap-3 px-2 py-2 rounded-md transition-colors", isRouteActive('/catalysts') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-slate-100 hover:text-brand-navy")}>
              <CalendarClock size={18} />
              <span>Upcoming Catalysts</span>
            </Link>
          </div>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Resources</p>
          <div className="space-y-1">
            <Link href="/reports" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 hover:text-brand-navy transition-colors">
              <FileText size={18} />
              <span>Reports</span>
            </Link>
            <Link href="/downloads" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 hover:text-brand-navy transition-colors">
              <Download size={18} />
              <span>Downloads</span>
            </Link>
            <Link href="/glossary" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 hover:text-brand-navy transition-colors">
              <BookOpen size={18} />
              <span>Glossary</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-100 hover:text-brand-navy transition-colors">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
