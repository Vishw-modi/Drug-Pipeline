import React from 'react';
import { getDrugs } from '@/services/drugs.service';
import { PipelineTable } from './PipelineTable';

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function PipelinePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const filters: Record<string, string> = {};
  
  if (resolvedParams) {
    Object.entries(resolvedParams).forEach(([k, v]) => {
      if (typeof v === 'string' && v !== 'All') filters[k] = v;
    });
  }

  const drugs = await getDrugs(filters);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">Drug Database</h1>
        <p className="text-[var(--color-muted)] mt-1">Detailed view of all pipeline drugs and their current status.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <PipelineTable data={drugs} />
      </div>
    </div>
  );
}
