'use client';

import React from 'react';
import { Building2, MapPin, Globe, Pill, FlaskConical, Target, AlertCircle } from 'lucide-react';
import { PipelineTable } from '@/app/pipeline/PipelineTable';
import { DonutChart } from '@/components/charts/DonutChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';

interface CompanyProfileDashboardProps {
  company: any; // Using any for deep relation types to simplify
}

export function CompanyProfileDashboard({ company }: CompanyProfileDashboardProps) {
  const drugs = company.drugs || [];
  
  // Calculate Key Insights
  const totalDrugs = drugs.length;
  
  const lateStageDrugs = drugs.filter((d: any) => 
    ['Phase III', 'Filed', 'Approved'].includes(d.development_phase)
  ).length;

  // Process data for charts
  const phaseMap = new Map<string, number>();
  const therapyMap = new Map<string, number>();

  drugs.forEach((drug: any) => {
    // Phase
    const phase = drug.development_phase || 'Unknown';
    phaseMap.set(phase, (phaseMap.get(phase) || 0) + 1);

    // Therapy Areas
    if (drug.drug_indications) {
      const uniqueAreas = new Set<string>();
      drug.drug_indications.forEach((ind: any) => {
        if (ind.therapeutic_area) {
          uniqueAreas.add(ind.therapeutic_area);
        }
      });
      uniqueAreas.forEach(area => {
        therapyMap.set(area, (therapyMap.get(area) || 0) + 1);
      });
    }
  });

  const phaseData = Array.from(phaseMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const therapyData = Array.from(therapyMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5

  const topTherapyArea = therapyData.length > 0 ? therapyData[0].name : 'N/A';

  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">{company.company_name}</h1>
              <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
                {company.headquarters && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>{company.headquarters}</span>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe size={16} />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-primary)] hover:underline">
                      {company.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {company.description && (
          <p className="mt-5 text-sm text-[var(--color-muted)] leading-relaxed max-w-4xl">
            {company.description}
          </p>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Pill size={18} />
            </div>
            <h3 className="font-medium text-[var(--color-muted)] text-sm">Total Pipeline Assets</h3>
          </div>
          <p className="text-3xl font-bold text-[var(--color-text-main)]">{totalDrugs}</p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Target size={18} />
            </div>
            <h3 className="font-medium text-[var(--color-muted)] text-sm">Late Stage & Approved</h3>
          </div>
          <p className="text-3xl font-bold text-[var(--color-text-main)]">{lateStageDrugs}</p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <FlaskConical size={18} />
            </div>
            <h3 className="font-medium text-[var(--color-muted)] text-sm">Top Therapeutic Area</h3>
          </div>
          <p className="text-xl font-bold text-[var(--color-text-main)] truncate mt-1" title={topTherapyArea}>{topTherapyArea}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6">Pipeline by Phase</h2>
          {phaseData.length > 0 ? (
            <DonutChart data={phaseData} />
          ) : (
            <div className="h-64 flex items-center justify-center text-[var(--color-muted)]">No phase data available</div>
          )}
        </div>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--color-text-main)] mb-6">Top Therapeutic Areas</h2>
          {therapyData.length > 0 ? (
            <HorizontalBarChart data={therapyData} height={260} />
          ) : (
            <div className="h-64 flex items-center justify-center text-[var(--color-muted)]">No therapeutic data available</div>
          )}
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-bold text-[var(--color-text-main)]">Asset Portfolio</h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">Complete overview of all investigational and approved drugs.</p>
        </div>
        <div className="p-6 pt-0">
          <PipelineTable data={drugs.map((d: any) => ({ ...d, company: { company_name: company.company_name } }))} />
        </div>
      </div>
    </div>
  );
}
