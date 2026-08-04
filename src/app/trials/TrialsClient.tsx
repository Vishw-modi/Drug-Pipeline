'use client';

import React, { useState, useMemo } from 'react';
import { DevelopmentPhaseTabs } from '@/components/trials/DevelopmentPhaseTabs';
import { PipelineDrugsList } from '@/components/trials/PipelineDrugsList';
import { MetricCard } from '@/components/ui/MetricCard';
import { Pill, Activity, FlaskConical, Building2 } from 'lucide-react';

interface TrialsClientProps {
  drugs: any[];
}

export function TrialsClient({ drugs }: TrialsClientProps) {
  const [activePhase, setActivePhase] = useState<string>('All');

  // Compute stats for KPI cards
  const stats = useMemo(() => {
    const activeTrialsCount = drugs.reduce((acc, drug) => acc + (drug.active_trials || 0), 0);
    const uniquePhases = new Set(drugs.map(d => d.development_phase)).size;
    const uniqueCompanies = new Set(drugs.map(d => d.company)).size;

    return {
      totalDrugs: drugs.length,
      activeTrials: activeTrialsCount,
      developmentPhases: uniquePhases,
      companies: uniqueCompanies
    };
  }, [drugs]);

  // Compute tabs with counts
  const phases = useMemo(() => {
    const counts: Record<string, number> = {};
    drugs.forEach(drug => {
      const phase = drug.development_phase || 'Unknown';
      counts[phase] = (counts[phase] || 0) + 1;
    });

    const phaseTabs = Object.entries(counts)
      .map(([label, count]) => ({ id: label, label, count }))
      .sort((a, b) => {
        // Simple sorting for common phases
        const order = ['Approved', 'Filed', 'Phase III', 'Phase II/III', 'Phase II', 'Phase I/II', 'Phase I', 'Preclinical'];
        const aIndex = order.indexOf(a.id);
        const bIndex = order.indexOf(b.id);
        
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.label.localeCompare(b.label);
      });

    return [
      { id: 'All', label: 'All', count: drugs.length },
      ...phaseTabs
    ];
  }, [drugs]);

  // Filter drugs based on active phase
  const filteredDrugs = useMemo(() => {
    if (activePhase === 'All') return drugs;
    return drugs.filter(drug => drug.development_phase === activePhase);
  }, [drugs, activePhase]);

  return (
    <div>
      {/* 1. Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Total Pipeline Drugs" 
          value={stats.totalDrugs} 
          icon={<Pill size={20} />} 
          insight="Assets in active development"
        />
        <MetricCard 
          title="Active Clinical Trials" 
          value={stats.activeTrials} 
          icon={<Activity size={20} />} 
          insight="Currently recruiting or active"
        />
        <MetricCard 
          title="Development Phases" 
          value={stats.developmentPhases} 
          icon={<FlaskConical size={20} />} 
          insight="Distinct stages of clinical evaluation"
        />
        <MetricCard 
          title="Companies Represented" 
          value={stats.companies} 
          icon={<Building2 size={20} />} 
          insight="Sponsors driving innovation"
        />
      </div>

      {/* 2. Development Phase Navigation */}
      <DevelopmentPhaseTabs 
        phases={phases} 
        activePhase={activePhase} 
        onPhaseChange={setActivePhase} 
      />

      {/* 3 & 4. Dynamic Pipeline Grid & Empty State */}
      <PipelineDrugsList drugs={filteredDrugs} />
    </div>
  );
}
