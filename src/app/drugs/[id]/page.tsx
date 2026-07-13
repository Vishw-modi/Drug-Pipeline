import React from 'react';
import { getDrugById } from '@/services/drugs.service';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { 
  ArrowLeft, Crosshair, FlaskConical, Hash, 
  CalendarClock, Activity, CheckCircle2, XCircle,
  Building2, Info
} from 'lucide-react';

export default async function DrugDetailsPage({ params }: { params: { id: string } }) {
  // Fix for Next.js 16 - Await params before using its properties
  const { id } = await params;
  const drug = await getDrugById(id);

  if (!drug) {
    notFound();
  }

  const renderDesignation = (label: string, value: boolean | null | undefined) => (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border ${value ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'bg-[var(--color-surface)] border-[var(--color-border)]'}`}>
      <span className={`text-xs font-medium ${value ? 'text-emerald-700 dark:text-emerald-400' : 'text-[var(--color-muted)]'}`}>
        {label}
      </span>
      {value ? (
        <CheckCircle2 size={16} className="text-emerald-500" />
      ) : (
        <XCircle size={16} className="text-slate-300 dark:text-slate-600" />
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Header Section */}
      <div className="mb-6">
        <Link href="/pipeline" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 rounded-full hover:bg-[var(--color-brand-primary)]/20 transition-colors mb-4">
          <ArrowLeft size={12} /> Back to Pipeline
        </Link>
        
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-brand-primary)]"></div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)]">{drug.drug_name}</h1>
                <StatusBadge status={drug.development_phase} />
              </div>
              
              {drug.company && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-[var(--color-muted)]">
                  <Building2 size={16} className="text-[var(--color-brand-primary)]" />
                  <Link href={`/companies/${drug.company.id}`} className="hover:text-[var(--color-brand-primary)] font-medium transition-colors">
                    {drug.company.company_name}
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 min-w-[160px]">
              <div className="bg-[var(--color-bg)] rounded-lg p-2.5 border border-[var(--color-border)]">
                <p className="text-[10px] font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1">Approval Status</p>
                <p className="font-semibold text-sm text-[var(--color-brand-navy)]">{drug.approval_status || 'Investigational'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-[var(--color-brand-primary)]/5 border-b border-[var(--color-border)] px-5 py-3">
              <CardTitle className="flex items-center gap-2 text-[var(--color-brand-navy)] text-base">
                <Info size={16} className="text-[var(--color-brand-primary)]" />
                Asset Overview
              </CardTitle>
            </div>
            <CardContent className="p-5">
              <p className="text-[var(--color-brand-navy)]/80 leading-relaxed text-sm">
                {drug.description || 'No description available for this asset.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-[var(--color-brand-primary)]/5 border-b border-[var(--color-border)] px-5 py-3">
              <CardTitle className="flex items-center gap-2 text-[var(--color-brand-navy)] text-base">
                <Activity size={16} className="text-[var(--color-brand-primary)]" />
                Clinical Characteristics
              </CardTitle>
            </div>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-brand-primary)]/30">
                  <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg shrink-0">
                    <Crosshair size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Target</p>
                    <p className="font-semibold text-[var(--color-brand-navy)] text-sm">{drug.target || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-brand-primary)]/30">
                  <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg shrink-0">
                    <FlaskConical size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Molecule Type</p>
                    <p className="font-semibold text-[var(--color-brand-navy)] text-sm">{drug.molecule_type || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-brand-primary)]/30">
                  <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg shrink-0">
                    <Hash size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Internal Code</p>
                    <p className="font-semibold text-[var(--color-brand-navy)] text-sm">{drug.internal_code || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-brand-primary)]/30">
                  <div className="p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg shrink-0">
                    <CalendarClock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Expected Launch</p>
                    <p className="font-semibold text-[var(--color-brand-navy)] text-sm">{formatDate(drug.expected_launch_date)}</p>
                  </div>
                </div>
                
                <div className="md:col-span-2 flex gap-3 items-start p-4 rounded-xl bg-[var(--color-brand-primary)]/5 border border-[var(--color-brand-primary)]/20">
                  <div className="p-2 bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] rounded-lg shrink-0">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-wider mb-1">Mechanism of Action</p>
                    <p className="font-medium text-[var(--color-brand-navy)] text-sm leading-relaxed">{drug.mechanism_of_action || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-[var(--color-brand-primary)]/5 border-b border-[var(--color-border)] px-5 py-3">
              <CardTitle className="flex items-center gap-2 text-[var(--color-brand-navy)] text-base">
                Regulatory Designations
              </CardTitle>
            </div>
            <CardContent className="p-5">
              <div className="space-y-2">
                {renderDesignation('First in Class', drug.first_in_class)}
                {renderDesignation('Orphan Designation', drug.orphan_designation)}
                {renderDesignation('Fast Track', drug.fast_track)}
                {renderDesignation('Breakthrough', drug.breakthrough_designation)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
