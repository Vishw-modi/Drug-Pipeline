import React from 'react';
import { BarChart3, Building2, Crown, Hash } from 'lucide-react';

interface ExecutiveOverviewProps {
  overview: any;
  topDrugs: any[];
}

export function ExecutiveOverview({ overview, topDrugs }: ExecutiveOverviewProps) {
  // Quick KPI calculations
  const topDrug = topDrugs.find((d) => d.rank === 1);
  
  let largestMarketShare = topDrugs[0];
  topDrugs.forEach((d) => {
    if (Number(d.market_share_pct) > Number(largestMarketShare?.market_share_pct || 0)) {
      largestMarketShare = d;
    }
  });

  const totalTrackedDrugs = topDrugs.length;

  return (
    <div className="space-y-6">
      {/* Overview Text */}
      <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">Executive Overview</h2>
        <p className="text-muted text-lg mb-6 leading-relaxed">
          {overview.description || "No description available."}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted">Market Size (2024)</p>
            <p className="font-semibold text-brand-navy text-lg">${overview.global_market_size_2024_usd_b}B</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted">2030 Forecast</p>
            <p className="font-semibold text-brand-navy text-lg">${overview.global_market_size_2030_usd_b}B</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted">CAGR</p>
            <p className="font-semibold text-emerald-600 text-lg">{overview.market_cagr_pct}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted">US Prevalence</p>
            <p className="font-semibold text-brand-navy text-lg">
              {Number(overview.us_prevalence) >= 1000000 
                ? `${(Number(overview.us_prevalence) / 1000000).toFixed(1)}M` 
                : `${(Number(overview.us_prevalence) / 1000).toFixed(0)}K`}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted">5-Year Survival</p>
            <p className="font-semibold text-brand-navy text-lg">{overview.five_year_survival_pct}%</p>
          </div>
        </div>
      </div>

      {/* Quick KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600">
            <Crown size={20} />
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-semibold">Top Drug</p>
            <p className="font-bold text-brand-navy">{topDrug?.brand_name || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-semibold">Leading Company</p>
            <p className="font-bold text-brand-navy truncate" title={topDrug?.company}>{topDrug?.company || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
            <BarChart3 size={20} />
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-semibold">Largest Share</p>
            <p className="font-bold text-brand-navy">
              {largestMarketShare?.market_share_pct}% <span className="text-xs font-normal text-muted">({largestMarketShare?.brand_name})</span>
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <Hash size={20} />
          </div>
          <div>
            <p className="text-xs text-muted uppercase font-semibold">Tracked Drugs</p>
            <p className="font-bold text-brand-navy">{totalTrackedDrugs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
