'use client';

import React from 'react';
import { useDashboardFilter } from '@/context/DashboardFilterContext';

interface FilterOptions {
  therapeuticAreas: string[];
  cancerTypes: string[];
  drugs: string[];
  developmentPhases: string[];
  moleculeTypes: string[];
  sponsors: string[];
}

interface FilterBarProps {
  options: FilterOptions;
}

export function FilterBar({ options }: FilterBarProps) {
  const { filters, setFilter, resetFilters, isPending } = useDashboardFilter();

  const SelectGroup = ({ label, value, onChange, items }: { label: string, value: string, onChange: (v: string) => void, items: string[] }) => (
    <div className={`flex flex-col gap-1 w-full sm:w-auto flex-1 min-w-[140px] ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
      <label className="text-xs font-semibold text-slate-600 px-1">{label}</label>
      <select 
        className="w-full bg-[var(--color-surface)] border border-slate-200 rounded-lg px-3 py-2 text-sm text-[var(--color-brand-navy)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] appearance-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.2em' }}
      >
        <option value="All">All</option>
        {items.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] mb-6 relative">
      <SelectGroup label="Therapeutic Area" value={filters.therapeuticArea} onChange={(v) => setFilter('therapeuticArea', v)} items={options.therapeuticAreas} />
      <SelectGroup label="Indication" value={filters.indication} onChange={(v) => setFilter('indication', v)} items={['All']} />
      <SelectGroup label="Cancer Type" value={filters.cancerType} onChange={(v) => setFilter('cancerType', v)} items={options.cancerTypes} />
      <SelectGroup label="Drug" value={filters.drug} onChange={(v) => setFilter('drug', v)} items={options.drugs} />
      <SelectGroup label="Development Phase" value={filters.developmentPhase} onChange={(v) => setFilter('developmentPhase', v)} items={options.developmentPhases} />
      <SelectGroup label="Molecule Type" value={filters.moleculeType} onChange={(v) => setFilter('moleculeType', v)} items={options.moleculeTypes} />
      <SelectGroup label="Company Type" value={filters.sponsor} onChange={(v) => setFilter('sponsor', v)} items={options.sponsors} />
      
      <button 
        onClick={resetFilters}
        disabled={isPending}
        className="px-4 py-2 bg-[#6345ED] hover:bg-[#5235C7] disabled:opacity-70 disabled:hover:bg-[#6345ED] text-white text-sm font-medium rounded-lg transition-colors shadow-sm ml-auto mt-2 sm:mt-0 flex items-center justify-center min-w-[140px]"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            Loading...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Reset Filters
          </div>
        )}
      </button>
    </div>
  );
}
