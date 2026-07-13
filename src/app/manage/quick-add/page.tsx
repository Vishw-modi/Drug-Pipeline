import React from 'react';
import { getCompanies } from '@/services/companies.service';
import { QuickAddClient } from './QuickAddClient';

export default async function QuickAddPage() {
  const companies = await getCompanies();
  
  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      <div className="flex-shrink-0 px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface)] sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-brand-navy)]">Quick Add Drug</h1>
          <p className="text-sm text-[var(--color-muted)] mt-1">Add a new company, drug, and primary indication in one step.</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-sm">
          <div className="p-6">
            <QuickAddClient companies={companies} />
          </div>
        </div>
      </div>
    </div>
  );
}
