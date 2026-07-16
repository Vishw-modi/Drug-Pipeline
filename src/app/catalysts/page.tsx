import React from 'react';
import { getUpcomingCatalysts } from '@/services/dashboard.service';
import { UpcomingCatalystsTable } from '@/components/dashboard/UpcomingCatalystsTable';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { getCatalystFilterOptions } from '@/services/filters.service';
import { CatalystTimelineChart } from '@/components/charts/CatalystTimelineChart';


export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function CatalystsPage({ searchParams }: PageProps) {
  const filterOptions = await getCatalystFilterOptions();
  
  const resolvedParams = await searchParams;
  const filters: Record<string, string> = {};
  
  if (resolvedParams) {
    Object.entries(resolvedParams).forEach(([k, v]) => {
      if (typeof v === 'string' && v !== 'All') filters[k] = v;
    });
  }

  // Pass filters WITHOUT targetMonths to get the global timeline view of catalysts
  const dbFilters = { ...filters };
  delete dbFilters.targetMonths;
  const allCatalysts = await getUpcomingCatalysts(dbFilters);

  // Apply targetMonths filter in-memory for the rest of the page components
  const targetMonthsStr = filters.targetMonths || '';
  const targetMonths = targetMonthsStr ? targetMonthsStr.split(',') : [];

  let filteredCatalysts = allCatalysts;
  if (targetMonths.length > 0) {
    filteredCatalysts = allCatalysts.filter(c => {
      const cDate = new Date(c.expected_date);
      const mStr = `${cDate.getFullYear()}-${String(cDate.getMonth() + 1).padStart(2, '0')}`;
      return targetMonths.includes(mStr);
    });
  }



  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">Upcoming Key Catalysts</h1>
        <p className="text-[var(--color-muted)] mt-1">Detailed view of all upcoming milestones and regulatory events in the next 12 months.</p>
      </div>
      
      {/* Interactive Timeline Chart */}
      <CatalystTimelineChart data={allCatalysts} />



      <FilterBar options={filterOptions} hideFilters={['Indication', 'Cancer Type', 'Molecule Type']} />

      <div className="bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border)] mt-6 p-1">
        <UpcomingCatalystsTable data={filteredCatalysts} preview={false} />
      </div>
    </div>
  );
}
