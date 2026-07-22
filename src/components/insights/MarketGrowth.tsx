import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface MarketGrowthProps {
  overview: any;
}

export function MarketGrowth({ overview }: MarketGrowthProps) {
  const size2024 = Number(overview.global_market_size_2024_usd_b) || 0;
  const size2030 = Number(overview.global_market_size_2030_usd_b) || 0;
  const cagr = Number(overview.market_cagr_pct) || 0;
  const growthMultiple = size2024 > 0 ? (size2030 / size2024).toFixed(1) : '—';

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-[var(--color-surface-hover)]">
        <h3 className="font-semibold text-brand-navy flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-primary" />
          Market Trajectory
        </h3>
      </div>
      
      <div className="p-6 md:p-8">
        {/* Side-by-side: Current vs Projected with growth narrative */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* 2024 */}
          <div className="text-center border-r border-border pr-4">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Today (2024)</p>
            <p className="text-3xl md:text-4xl font-bold text-brand-navy">${size2024}B</p>
          </div>
          {/* 2030 */}
          <div className="text-center pl-4">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Projected (2030)</p>
            <p className="text-3xl md:text-4xl font-bold text-brand-primary">${size2030}B</p>
          </div>
        </div>

        {/* Growth bar visual */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-muted mb-1.5">
            <span>2024</span>
            <span>2030</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-sm overflow-hidden relative">
            <div 
              className="h-full rounded-sm transition-all duration-1000"
              style={{ 
                width: `${size2030 > 0 ? ((size2024 / size2030) * 100) : 50}%`,
                background: 'linear-gradient(90deg, var(--color-brand-navy) 0%, var(--color-brand-primary) 100%)'
              }}
            />
            {/* Full projected bar behind */}
            <div className="absolute inset-0 border-2 border-dashed border-brand-primary/30 rounded-sm" />
          </div>
        </div>

        {/* CAGR callout */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-sm px-4 py-2 rounded-full border border-emerald-200">
            <ArrowUpRight size={16} />
            {cagr}% CAGR
          </div>
          <span className="text-sm text-muted">
            {growthMultiple}× growth in 6 years
          </span>
        </div>
      </div>
    </div>
  );
}
