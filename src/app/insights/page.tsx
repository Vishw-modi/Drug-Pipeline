import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PieChart, TrendingUp, Activity, Users } from 'lucide-react';

export const metadata = {
  title: 'Market Insights | Drugscape',
  description: 'Executive overview of major oncology markets',
};

export default async function InsightsPage() {
  const supabase = await createClient();

  const { data: markets, error } = await supabase
    .from('cancer_market_overview')
    .select('*')
    .order('global_market_size_2024_usd_b', { ascending: false });

  if (error) {
    console.error('Error fetching market overview:', error);
    return <div className="p-8 text-red-500">Error loading market data.</div>;
  }

  if (!markets || markets.length === 0) {
    return <div className="p-8">No market data available.</div>;
  }

  // Calculate Summary Stats
  const totalMarkets = markets.length;
  const combinedMarketSize = markets.reduce((sum, market) => sum + (Number(market.global_market_size_2024_usd_b) || 0), 0);
  
  const fastestGrowing = markets.reduce((prev, current) => {
    return (Number(current.market_cagr_pct) || 0) > (Number(prev.market_cagr_pct) || 0) ? current : prev;
  }, markets[0]);

  const highestPrevalence = markets.reduce((prev, current) => {
    return (Number(current.us_prevalence) || 0) > (Number(prev.us_prevalence) || 0) ? current : prev;
  }, markets[0]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy flex items-center gap-2">
            <PieChart className="w-8 h-8 text-brand-primary" />
            Market Insights
          </h1>
          <p className="text-muted mt-2">Executive overview of major oncology markets</p>
        </div>
      </div>

      {/* Top Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
          <div className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-primary" />
            Total Markets
          </div>
          <div className="text-3xl font-bold text-brand-navy">{totalMarkets}</div>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
          <div className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-brand-primary" />
            Combined Market Size
          </div>
          <div className="text-3xl font-bold text-brand-navy">${combinedMarketSize.toFixed(1)}B+</div>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
          <div className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Fastest Growing
          </div>
          <div className="text-2xl font-bold text-brand-navy truncate" title={fastestGrowing.cancer_type}>
            {fastestGrowing.cancer_type}
          </div>
          <div className="text-sm text-emerald-600 font-medium mt-1">
            {fastestGrowing.market_cagr_pct}% CAGR
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
          <div className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            Highest Prevalence
          </div>
          <div className="text-2xl font-bold text-brand-navy truncate" title={highestPrevalence.cancer_type}>
            {highestPrevalence.cancer_type}
          </div>
          <div className="text-sm text-muted mt-1">
            {(Number(highestPrevalence.us_prevalence) / 1000).toFixed(0)}K Patients
          </div>
        </div>
      </div>

      <hr className="border-border my-8" />

      {/* Cancer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <Link 
            key={market.id} 
            href={`/insights/${market.cancer_type_slug}`}
            className="group block bg-surface rounded-xl p-6 border border-border shadow-sm hover:border-brand-primary/50 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Hover subtle background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-brand-navy mb-4 group-hover:text-brand-primary transition-colors">
                {market.cancer_type}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Market Size</span>
                  <span className="font-semibold text-brand-navy">${market.global_market_size_2024_usd_b}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">CAGR</span>
                  <span className="font-medium text-emerald-600">{market.market_cagr_pct}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted text-sm">Patients</span>
                  <span className="font-medium text-brand-navy">
                    {Number(market.us_prevalence) >= 1000000 
                      ? `${(Number(market.us_prevalence) / 1000000).toFixed(1)}M` 
                      : `${(Number(market.us_prevalence) / 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
