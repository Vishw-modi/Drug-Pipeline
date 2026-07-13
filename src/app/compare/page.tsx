import React, { Suspense } from 'react';
import { getDrugsMinimal, getDrugsByIds } from '@/services/drugs.service';
import { DrugComparisonSelector } from '@/components/compare/DrugComparisonSelector';
import { ComparisonGrid } from '@/components/compare/ComparisonGrid';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Comparative Analysis | Pharma Dashboard',
};

export const dynamic = 'force-dynamic';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const drugParams = resolvedParams.drugs;
  
  let selectedIds: string[] = [];
  if (typeof drugParams === 'string') {
    selectedIds = drugParams.split(',');
  } else if (Array.isArray(drugParams)) {
    selectedIds = drugParams;
  }

  const [availableDrugs, selectedDrugsData] = await Promise.all([
    getDrugsMinimal(),
    getDrugsByIds(selectedIds)
  ]);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Comparative Analysis</h1>
        <p className="text-muted mt-1">Select and compare multiple drugs side-by-side to analyze their attributes, mechanisms, and designations.</p>
      </div>

      <DrugComparisonSelector availableDrugs={availableDrugs} />

      <Suspense fallback={
        <div className="bg-surface border border-border rounded-xl h-64 flex items-center justify-center shadow-sm">
          <Loader2 className="animate-spin text-brand-primary" size={32} />
        </div>
      }>
        <ComparisonGrid drugs={selectedDrugsData} />
      </Suspense>
    </div>
  );
}
