import React from 'react';
import Link from 'next/link';
import { Pill, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketLeadersProps {
  topDrugs: any[];
}

export function MarketLeaders({ topDrugs }: MarketLeadersProps) {
  if (!topDrugs || topDrugs.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-border bg-[var(--color-surface-hover)]">
          <h3 className="font-semibold text-brand-navy flex items-center gap-2">
            <Pill size={18} className="text-brand-primary" />
            Market Leaders
          </h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted italic">No data available.</p>
        </div>
      </div>
    );
  }

  // Calculate maximums for chart scaling
  const maxShare = Math.max(...topDrugs.map(d => Number(d.market_share_pct) || 0));
  const maxRevenue = Math.max(...topDrugs.map(d => Number(d.global_revenue_2024_usd_b) || 0));

  const renderTrendBadge = (trend: string) => {
    switch (trend) {
      case 'growing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <TrendingUp size={12} /> Growing
          </span>
        );
      case 'declining':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <TrendingDown size={12} /> Declining
          </span>
        );
      case 'stable':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Minus size={12} /> Stable
          </span>
        );
    }
  };

  const DrugLink = ({ drug }: { drug: any }) => {
    const name = drug.brand_name || drug.drug_name;
    if (drug.drug_id) {
      return (
        <Link href={`/drugs/${drug.drug_id}`} className="text-brand-primary hover:underline font-medium">
          {name}
        </Link>
      );
    }
    return <span className="font-medium text-brand-navy">{name}</span>;
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden mt-8">
      <div className="p-4 border-b border-border bg-[var(--color-surface-hover)]">
        <h3 className="font-semibold text-brand-navy flex items-center gap-2">
          <Pill size={18} className="text-brand-primary" />
          Market Leaders
        </h3>
      </div>
      
      <div className="p-6 space-y-10">
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Market Share Chart */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Market Share (2024)</h4>
            <div className="space-y-3">
              {topDrugs.slice(0, 5).map((drug) => {
                const share = Number(drug.market_share_pct) || 0;
                const widthPct = maxShare > 0 ? (share / maxShare) * 100 : 0;
                return (
                  <div key={drug.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <DrugLink drug={drug} />
                      <span className="text-brand-navy font-bold">{share.toFixed(1)}%</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-brand-navy rounded-sm transition-all duration-1000" 
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Revenue (2024)</h4>
            <div className="space-y-3">
              {topDrugs.slice(0, 5).map((drug) => {
                const revenue = Number(drug.global_revenue_2024_usd_b) || 0;
                const widthPct = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
                return (
                  <div key={drug.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <DrugLink drug={drug} />
                      <span className="text-brand-navy font-bold">${revenue.toFixed(1)}B</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-sm overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary rounded-sm transition-all duration-1000" 
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div>
          <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Top Drugs Data</h4>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-[var(--color-surface-hover)] border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center w-16">Rank</th>
                  <th className="px-4 py-3 font-semibold">Drug</th>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold text-right">Revenue (24)</th>
                  <th className="px-4 py-3 font-semibold text-right">Market Share</th>
                  <th className="px-4 py-3 font-semibold text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topDrugs.map((drug, index) => (
                  <tr 
                    key={drug.id} 
                    className={`border-b border-border hover:bg-[var(--color-surface-hover)]/50 transition-colors ${index === topDrugs.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <td className="px-4 py-3 text-center text-muted font-medium">{drug.rank}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-brand-navy">
                        <DrugLink drug={drug} />
                      </div>
                      <div className="text-xs text-muted truncate max-w-[200px]" title={drug.mechanism_of_action}>
                        {drug.mechanism_of_action}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brand-navy">{drug.company}</td>
                    <td className="px-4 py-3 text-right font-medium text-brand-navy">
                      ${Number(drug.global_revenue_2024_usd_b).toFixed(2)}B
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-brand-navy">
                      {Number(drug.market_share_pct).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      {renderTrendBadge(drug.revenue_trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
