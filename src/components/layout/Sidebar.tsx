'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Beaker, Building2, FlaskConical, CalendarClock, 
  Settings, FileText, Download, BookOpen, Activity, ChevronsLeft, ChevronsRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isRouteActive = (route: string) => pathname === route;

  return (
    <aside 
      className={cn(
        "bg-surface border-r border-border text-muted flex flex-col h-screen transition-all duration-300 ease-in-out shrink-0",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn("p-4 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <Link href="/" className="text-lg font-bold text-brand-navy flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Activity className="text-brand-primary shrink-0" size={20} />
            <span className="truncate">KMK Pipeline</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted hover:text-brand-navy transition-colors p-1 rounded-md hover:bg-[var(--color-surface-hover)]"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          suppressHydrationWarning
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-6 mt-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div>
          {!isCollapsed && <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Therapeutic Areas</p>}
          <div className="space-y-1">
            <Link 
              href="/" 
              title="Oncology"
              className={cn(
                "flex items-center rounded-md transition-colors", 
                isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2",
                isRouteActive('/') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-[var(--color-surface-hover)] hover:text-brand-navy"
              )}
            >
              <LayoutDashboard size={isCollapsed ? 20 : 18} className="shrink-0" />
              {!isCollapsed && <span>Oncology</span>}
            </Link>
            {!isCollapsed && ['Immunology', 'Neurology', 'Cardiovascular', 'Rare Disease', 'Endocrinology', 'Infectious Disease'].map(area => (
              <div key={area} className="flex items-center gap-3 px-3 py-2 rounded-md opacity-50 cursor-not-allowed">
                <div className="w-[18px] shrink-0" />
                <span className="text-sm truncate">{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Analytics</p>}
          <div className="space-y-1">
            {[
              { route: '/pipeline', icon: Beaker, label: 'Pipeline Explorer' },
              { route: '/compare', icon: Building2, label: 'Comparative Analysis' },
              { route: '/trials', icon: FlaskConical, label: 'Market Insights' },
              { route: '/catalysts', icon: CalendarClock, label: 'Upcoming Catalysts' }
            ].map(({ route, icon: Icon, label }) => (
              <Link 
                key={route}
                href={route} 
                title={label}
                className={cn(
                  "flex items-center rounded-md transition-colors", 
                  isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2",
                  isRouteActive(route) ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-[var(--color-surface-hover)] hover:text-brand-navy"
                )}
              >
                <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Resources</p>}
          <div className="space-y-1">
            {[
              { route: '/reports', icon: FileText, label: 'Reports' },
              { route: '/downloads', icon: Download, label: 'Downloads' },
              { route: '/glossary', icon: BookOpen, label: 'Glossary' }
            ].map(({ route, icon: Icon, label }) => (
              <Link 
                key={route}
                href={route} 
                title={label}
                className={cn(
                  "flex items-center rounded-md transition-colors hover:bg-[var(--color-surface-hover)] hover:text-brand-navy",
                  isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2"
                )}
              >
                <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-3 mt-auto space-y-1">
        <Link 
          href="/settings" 
          title="Settings"
          className={cn(
            "flex items-center rounded-md transition-colors hover:bg-[var(--color-surface-hover)] hover:text-brand-navy",
            isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2"
          )}
        >
          <Settings size={isCollapsed ? 20 : 18} className="shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
