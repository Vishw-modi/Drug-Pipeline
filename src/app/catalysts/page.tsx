import React from 'react';
import { getUpcomingCatalysts } from '@/services/dashboard.service';
import { UpcomingCatalystsTable } from '@/components/dashboard/UpcomingCatalystsTable';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { getFilterOptions, getCatalystFilterOptions } from '@/services/filters.service';

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

  // Passing a high limit to get all catalysts, or modify service to not limit
  // For now, getUpcomingCatalysts fetches 10, we will just pass filters
  const catalysts = await getUpcomingCatalysts(filters);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">Upcoming Key Catalysts</h1>
        <p className="text-[var(--color-muted)] mt-1">Detailed view of all upcoming milestones and regulatory events in the next 12 months.</p>
      </div>

      <FilterBar options={filterOptions} hideFilters={['Indication', 'Cancer Type', 'Molecule Type']} />

      <div className="bg-surface rounded-xl shadow-sm border border-border mt-6 p-1">
        <UpcomingCatalystsTable data={catalysts} preview={false} />
      </div>
    </div>
  );
}
