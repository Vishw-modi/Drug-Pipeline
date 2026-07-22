import React from 'react';
import { Users2, HeartPulse, ShieldCheck } from 'lucide-react';

interface CancerEpidemiologyProps {
  overview: any;
}

export function CancerEpidemiology({ overview }: CancerEpidemiologyProps) {
  const newCases = overview.us_new_cases_2025 || 0;
  const deaths = overview.us_deaths_2025 || 0;
  const prevalence = overview.us_prevalence || 0;
  const survival = Number(overview.five_year_survival_pct) || 0;
  
  const mortalityRate = newCases > 0 ? ((deaths / newCases) * 100).toFixed(0) : '0';
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num.toLocaleString();
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (survival / 100) * circumference;

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-[var(--color-surface-hover)]">
        <h3 className="font-semibold text-brand-navy flex items-center gap-2">
          <Users2 size={18} className="text-brand-primary" />
          Patient Landscape — US, 2025
        </h3>
      </div>
      
      <div className="p-6 md:p-8">
        {/* Narrative: top-level KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* New cases */}
          <div className="text-center">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">New Cases / yr</p>
            <p className="text-2xl md:text-3xl font-bold text-brand-navy">{formatNumber(newCases)}</p>
          </div>
          {/* Deaths */}
          <div className="text-center">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Deaths / yr</p>
            <p className="text-2xl md:text-3xl font-bold text-rose-600">{formatNumber(deaths)}</p>
          </div>
          {/* Prevalence */}
          <div className="text-center">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Living with Disease</p>
            <p className="text-2xl md:text-3xl font-bold text-brand-primary">{formatNumber(prevalence)}</p>
          </div>
          {/* 5-yr Survival */}
          <div className="text-center">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">5-Year Survival</p>
            <p className="text-2xl md:text-3xl font-bold text-emerald-600">{survival}%</p>
          </div>
        </div>

        {/* Visual story: Incidence bar vs Mortality bar with narrative context */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-3 mb-5">
            <HeartPulse size={16} className="text-rose-500" />
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Incidence vs Mortality</h4>
          </div>
          
          <div className="space-y-3">
            {/* New Cases bar */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-navy font-medium w-24 shrink-0">New Cases</span>
              <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-brand-primary/80 rounded-sm transition-all duration-1000" 
                  style={{ width: '100%' }}
                />
              </div>
              <span className="text-sm font-bold text-brand-navy w-16 text-right shrink-0">{formatNumber(newCases)}</span>
            </div>
            {/* Deaths bar */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-navy font-medium w-24 shrink-0">Deaths</span>
              <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-rose-500/80 rounded-sm transition-all duration-1000" 
                  style={{ width: `${newCases > 0 ? ((deaths / newCases) * 100) : 0}%` }}
                />
              </div>
              <span className="text-sm font-bold text-rose-600 w-16 text-right shrink-0">{formatNumber(deaths)}</span>
            </div>
          </div>
          
          {/* Narrative callout */}
          <p className="text-sm text-muted mt-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
            <span>
              <strong className="text-brand-navy">{mortalityRate}%</strong> mortality rate — 
              <strong className="text-emerald-600"> {survival}%</strong> of patients survive 5+ years after diagnosis.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
