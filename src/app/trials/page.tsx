import React from 'react';
import { getPipelineWithTrials } from '@/services/trial.service';
import { TrialsClient } from './TrialsClient';

export const revalidate = 3600; // Cache for 1 hour

export default async function TrialsPage() {
  const drugs = await getPipelineWithTrials();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-navy)]">Clinical Trials</h1>
        <p className="text-[var(--color-muted)] mt-1">
          Explore the clinical development pipeline and distribution of drugs across development phases.
        </p>
      </div>

      <TrialsClient drugs={drugs} />
    </div>
  );
}
