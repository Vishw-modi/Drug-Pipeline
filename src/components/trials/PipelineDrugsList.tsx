'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ArrowRight, Building2, Beaker, Crosshair, Activity, AlertCircle } from 'lucide-react';

interface PipelineDrugsListProps {
  drugs: any[];
}

export function PipelineDrugsList({ drugs }: PipelineDrugsListProps) {
  if (drugs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm">
        <div className="w-16 h-16 bg-[var(--color-bg)] rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-[var(--color-muted)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-brand-navy)] mb-2">No Drugs Found</h3>
        <p className="text-[var(--color-muted)] text-center max-w-md">
          No drugs are currently available in this development phase. Select another phase to explore the pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {drugs.map((drug) => (
        <Card key={drug.id} className="flex flex-col hover:shadow-md transition-shadow h-full border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <StatusBadge status={drug.development_phase} />
              {drug.trial_count > 0 && (
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] px-2.5 py-1 rounded-full">
                  <Activity size={12} />
                  {drug.trial_count} {drug.trial_count === 1 ? 'Trial' : 'Trials'}
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-[var(--color-brand-navy)] mb-1 leading-tight">
              {drug.drug_name}
            </h3>
            {drug.brand_name && (
              <p className="text-sm font-medium text-[var(--color-brand-primary)] mb-2">
                {drug.brand_name}
              </p>
            )}
            <p className="text-sm text-[var(--color-muted)] mb-4 flex items-center gap-1.5">
              <Building2 size={14} className="shrink-0" />
              <span className="truncate">{drug.company}</span>
            </p>
            
            <div className="space-y-3 mt-auto">
              <div className="flex gap-2 items-start text-sm">
                <Crosshair size={14} className="text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-[var(--color-muted)] uppercase tracking-wider block mb-0.5 font-semibold">Indication</span>
                  <span className="text-[var(--color-brand-navy)] line-clamp-1">{drug.cancer_type}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] p-3 mt-auto">
            <Link 
              href={`/drugs/${drug.id}`}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-brand-navy)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/5 transition-colors shadow-sm"
            >
              View Drug <ArrowRight size={16} />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
