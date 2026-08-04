import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

import { ExecutiveOverview } from '@/components/insights/ExecutiveOverview';
import { CancerEpidemiology } from '@/components/insights/CancerEpidemiology';
import { MarketGrowth } from '@/components/insights/MarketGrowth';
import { DiseaseLandscape } from '@/components/insights/DiseaseLandscape';
import { MarketLeaders } from '@/components/insights/MarketLeaders';

interface InsightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('cancer_market_overview')
    .select('cancer_type')
    .eq('cancer_type_slug', slug)
    .single();

  if (!data) return { title: 'Not Found | Drugscape' };

  return {
    title: `${data.cancer_type} Insights | Drugscape`,
    description: `Executive market overview and epidemiology for ${data.cancer_type}`,
  };
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Overview
  const { data: overview, error: overviewError } = await supabase
    .from('cancer_market_overview')
    .select('*')
    .eq('cancer_type_slug', slug)
    .single();

  if (overviewError || !overview) {
    console.error('Error fetching cancer overview:', overviewError);
    notFound();
  }

  // 2. Fetch Top Drugs
  const { data: topDrugs, error: drugsError } = await supabase
    .from('cancer_top_drugs')
    .select('*')
    .eq('cancer_type_slug', slug)
    .order('rank', { ascending: true });

  if (drugsError) {
    console.error('Error fetching top drugs:', drugsError);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-medium text-muted">
        <Link href="/insights" className="hover:text-brand-primary transition-colors">
          Market Insights
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-brand-navy">{overview.cancer_type}</span>
      </nav>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">{overview.cancer_type}</h1>
      </div>

      <ExecutiveOverview overview={overview} topDrugs={topDrugs || []} />

      {/* Patient Landscape — full width for the narrative to breathe */}
      <CancerEpidemiology overview={overview} />

      {/* Market + Disease side by side — equal width so nothing clips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MarketGrowth overview={overview} />
        <DiseaseLandscape overview={overview} />
      </div>

      <MarketLeaders topDrugs={topDrugs || []} />

    </div>
  );
}
