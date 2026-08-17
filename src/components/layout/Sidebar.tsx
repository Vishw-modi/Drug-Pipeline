'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Beaker, Building2, FlaskConical, CalendarClock, 
  Settings, FileText, Download, BookOpen, Activity, ChevronsLeft, ChevronsRight, LineChart, PieChart, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isRouteActive = (route: string) => pathname === route;

  // Close mobile sidebar when clicking a link
  const handleLinkClick = () => {
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-3 left-4 z-[60] p-2 rounded-md bg-surface border border-border text-brand-navy shadow-sm"
        title="Toggle Menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[45]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "bg-surface border-r border-border text-muted flex flex-col h-screen transition-all duration-300 ease-in-out shrink-0",
          "fixed md:relative z-50 md:z-0", // Fixed on mobile, relative on desktop
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-56"
        )}
      >
        <div className={cn("p-4 flex items-center h-16", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <Link href="/" className="text-lg font-bold text-brand-navy flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/Drugscrape.png" alt="Drugscape Logo" className="h-6 w-auto object-contain shrink-0" />
            <span className="truncate">DRUGSCAPE</span>
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
              onClick={handleLinkClick}
              title="Oncology"
              className={cn(
                "flex items-center rounded-md transition-colors", 
                isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2",
                isRouteActive('/') ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-[var(--color-surface-hover)] hover:text-brand-navy"
              )}
            >
              <LayoutDashboard size={isCollapsed ? 20 : 18} className="shrink-0" />
              {!isCollapsed && <span className="text-sm">Oncology</span>}
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
              { route: '/companies', icon: Building2, label: 'Companies Directory' },
              { route: '/pipeline', icon: Beaker, label: 'Drug Database' },
              { route: '/compare', icon: LineChart, label: 'Comparative Analysis' },
              { route: '/insights', icon: PieChart, label: 'Market Insights' },
              { route: '/trials', icon: FlaskConical, label: 'Clinical Trials' },
              { route: '/catalysts', icon: CalendarClock, label: 'Upcoming Catalysts' }
            ].map(({ route, icon: Icon, label }) => (
              <Link 
                key={route}
                href={route} 
                title={label}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center rounded-md transition-colors", 
                  isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2",
                  isRouteActive(route) ? "bg-brand-primary/10 text-brand-primary font-medium" : "hover:bg-[var(--color-surface-hover)] hover:text-brand-navy"
                )}
              >
                <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
                {!isCollapsed && <span className="text-sm truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && <p className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">Resources</p>}
          <div className="space-y-1">
            {[
              { route: '/reports', icon: FileText, label: 'Reports' }
            ].map(({ route, icon: Icon, label }) => (
              <Link 
                key={route}
                href={route} 
                title={label}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center rounded-md transition-colors hover:bg-[var(--color-surface-hover)] hover:text-brand-navy",
                  isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2"
                )}
              >
                <Icon size={isCollapsed ? 20 : 18} className="shrink-0" />
                {!isCollapsed && <span className="text-sm truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      </aside>
    </>
  );
}

