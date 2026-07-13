import React, { Suspense } from 'react';
import { MetricCard, MetricCardSkeleton } from '@/components/ui/MetricCard';
import { getDashboardSummary, getPipelineByPhase, getPipelineByCancerType, getPipelineByMoleculeType, getPipelineBySponsor, getUpcomingCatalysts, getRecentUpdates } from '@/services/dashboard.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DonutChart } from '@/components/charts/DonutChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { Pill, Activity, CheckCircle, Clock, ArrowRight, Building2, Stethoscope } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { getDrugs } from '@/services/drugs.service';
import { getFilterOptions } from '@/services/filters.service';
import { SamplePipelineTable } from '@/components/dashboard/SamplePipelineTable';
import { UpcomingCatalystsTable } from '@/components/dashboard/UpcomingCatalystsTable';
import { FilterBar } from '@/components/dashboard/FilterBar';

export const revalidate = 3600; // Cache the page for 1 hour

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function DashboardMetrics({ filters }: { filters: Record<string, string> }) {
  const summary = await getDashboardSummary(filters);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <MetricCard 
        title="Total Pipeline Drugs" 
        value={summary.total_pipeline_drugs} 
        icon={<Pill size={20} />} 
        insight="Total active development programs across all phases."
      />
      <MetricCard 
        title="Early Stage" 
        value={summary.early_stage} 
        icon={<Activity size={20} />} 
        insight="Preclinical and Phase I candidates showing promise."
      />
      <MetricCard 
        title="Mid Stage" 
        value={summary.mid_stage} 
        icon={<Clock size={20} />} 
        insight="Phase II clinical trials evaluating efficacy and safety."
      />
      <MetricCard 
        title="Late Stage" 
        value={summary.late_stage} 
        icon={<Clock size={20} />} 
        insight="Phase III trials nearing regulatory submission."
      />
      <MetricCard 
        title="Approved" 
        value={summary.approved} 
        icon={<CheckCircle size={20} />} 
        insight="Successfully launched commercial products."
      />
    </div>
  );
}

async function ChartsSection({ filters }: { filters: Record<string, string> }) {
  const [phaseData, cancerTypeData, moleculeData, sponsorData, catalysts] = await Promise.all([
    getPipelineByPhase(filters),
    getPipelineByCancerType(filters),
    getPipelineByMoleculeType(filters),
    getPipelineBySponsor(filters),
    getUpcomingCatalysts(filters)
  ]);

  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* First row: Donut Charts (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Development Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={phaseData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Molecule Type</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={moleculeData} colorScheme="molecule" />
          </CardContent>
        </Card>
      </div>

      {/* Second row: Horizontal Bars (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Cancer Type</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart data={cancerTypeData} filterKey="cancerType" tooltipIcon={<Stethoscope size={16} />} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalBarChart data={sponsorData} filterKey="sponsor" tooltipIcon={<Building2 size={16} />} />
          </CardContent>
        </Card>
      </div>

      {/* Third row: Catalysts Table (1 col, full width) */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Upcoming Key Catalysts (Next 12 Months)</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="-mx-6">
              <UpcomingCatalystsTable data={catalysts} />
            </div>
            <div className="flex justify-center mt-4">
              <Link href="/catalysts" className="flex items-center text-sm font-medium text-[var(--color-brand-primary)] hover:underline">
                View All Catalysts <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function SamplePipelineSection({ filters }: { filters: Record<string, string> }) {
  // Pass filters to getDrugs as well if supported. Assuming it is for now, or just fetch all
  const drugs = await getDrugs(filters);
  const sampleDrugs = drugs.slice(0, 5); // Take top 5 for preview

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Drug Database (Sample View)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="-mx-6">
          <SamplePipelineTable data={sampleDrugs} />
        </div>
        <div className="flex justify-end mt-4">
          <Link href="/pipeline" className="flex items-center text-sm font-medium text-[var(--color-brand-primary)] hover:underline">
            View Full Drug Database <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

async function ListsSection({ filters }: { filters: Record<string, string> }) {
  const updates = await getRecentUpdates(filters);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Drug Updates</CardTitle>
        </CardHeader>
        <CardContent>
          {updates.length === 0 ? (
            <div className="text-sm text-[var(--color-muted)] py-4 text-center">No recent drug updates.</div>
          ) : (
            <ul className="space-y-4">
              {updates.map(u => (
                <li key={u.id} className="flex justify-between items-start border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm text-[var(--color-brand-navy)]">{u.update_title}</p>
                    <p className="text-xs text-[var(--color-muted)] mt-1">{u.drug_name} • {u.update_type}</p>
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatDate(u.update_date)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default async function OverviewDashboard({ searchParams }: PageProps) {
  const filterOptions = await getFilterOptions();
  
  // Await searchParams in Next.js 15+, or just read them in 14. 
  // For safety with Turbopack / Next 15 types, we await it if it's a promise, but TS might complain if it's not.
  // In Next 14, searchParams is an object. In 15, it's a promise. We defined it as Promise in PageProps to support 15.
  const resolvedParams = await searchParams;
  
  // Cast and clean up searchParams to Record<string, string>
  const filters: Record<string, string> = {};
  if (resolvedParams) {
    Object.entries(resolvedParams).forEach(([k, v]) => {
      if (typeof v === 'string' && v !== 'All') filters[k] = v;
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">Oncology Overview</h1>
        <p className="text-[var(--color-muted)] mt-1">High-level insights across the pipeline.</p>
      </div>

      <FilterBar options={filterOptions} />

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {[...Array(5)].map((_, i) => <MetricCardSkeleton key={i} />)}
        </div>
      }>
        <DashboardMetrics filters={filters} />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse rounded-xl mb-6"></div>}>
        <ChartsSection filters={filters} />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse rounded-xl mb-6"></div>}>
        <SamplePipelineSection filters={filters} />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse rounded-xl"></div>}>
        <ListsSection filters={filters} />
      </Suspense>
    </div>
  );
}
