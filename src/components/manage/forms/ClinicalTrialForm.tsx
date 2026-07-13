'use client';

import React, { useState, useTransition } from 'react';
import { Drug } from '@/types/drug';
import { createTrial, updateTrial } from '@/app/actions/manage.actions';
import { RelationshipSelect } from '@/components/manage/fields/RelationshipSelect';

interface ClinicalTrialFormProps {
  initialData?: any | null; // using any since type isn't fully exported but we know schema
  drugs: Drug[];
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function ClinicalTrialForm({ initialData, drugs, mode, onSuccess, onCancel }: ClinicalTrialFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isReadOnly = mode === 'view';
  const drugOptions = drugs.map(d => ({ id: d.id, label: d.drug_name }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = {
      drug_id: parseInt(formData.get('drug_id') as string),
      trial_name: formData.get('trial_name') as string,
      nct_id: formData.get('nct_id') as string || null,
      sponsor: formData.get('sponsor') as string || null,
      phase: formData.get('phase') as string || null,
      status: formData.get('status') as string || null,
      study_type: formData.get('study_type') as string || null,
      indication: formData.get('indication') as string || null,
      enrollment: formData.get('enrollment') ? parseInt(formData.get('enrollment') as string) : null,
      geography: formData.get('geography') as string || null,
      start_date: formData.get('start_date') as string || null,
      primary_completion_date: formData.get('primary_completion_date') as string || null,
      completion_date: formData.get('completion_date') as string || null,
      primary_endpoint: formData.get('primary_endpoint') as string || null,
      result_summary: formData.get('result_summary') as string || null,
      notes: formData.get('notes') as string || null,
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateTrial(initialData.id, data);
      } else {
        result = await createTrial(data);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-8">
          
          {/* Section 1: Trial Identification */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Trial Identification
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Drug *</label>
                <RelationshipSelect 
                  id="drug_id"
                  name="drug_id"
                  options={drugOptions}
                  defaultValue={initialData?.drug_id}
                  disabled={isReadOnly}
                  required
                  placeholder="Select a drug..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Trial Name / Title *</label>
                <input
                  type="text"
                  name="trial_name"
                  required
                  disabled={isReadOnly}
                  defaultValue={initialData?.trial_name || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">NCT ID (ClinicalTrials.gov)</label>
                  <input
                    type="text"
                    name="nct_id"
                    disabled={isReadOnly}
                    defaultValue={initialData?.nct_id || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Sponsor</label>
                  <input
                    type="text"
                    name="sponsor"
                    disabled={isReadOnly}
                    defaultValue={initialData?.sponsor || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Section 2: Study Details */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Study Details
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Phase</label>
                  <select
                    name="phase"
                    disabled={isReadOnly}
                    defaultValue={initialData?.phase || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select phase...</option>
                    <option value="Phase I">Phase I</option>
                    <option value="Phase I/II">Phase I/II</option>
                    <option value="Phase II">Phase II</option>
                    <option value="Phase II/III">Phase II/III</option>
                    <option value="Phase III">Phase III</option>
                    <option value="Phase IV">Phase IV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Status</label>
                  <select
                    name="status"
                    disabled={isReadOnly}
                    defaultValue={initialData?.status || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select status...</option>
                    <option value="Not Yet Recruiting">Not Yet Recruiting</option>
                    <option value="Recruiting">Recruiting</option>
                    <option value="Active, Not Recruiting">Active, Not Recruiting</option>
                    <option value="Completed">Completed</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Withdrawn">Withdrawn</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Study Type</label>
                  <select
                    name="study_type"
                    disabled={isReadOnly}
                    defaultValue={initialData?.study_type || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select type...</option>
                    <option value="Interventional">Interventional</option>
                    <option value="Observational">Observational</option>
                    <option value="Expanded Access">Expanded Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Enrollment</label>
                  <input
                    type="number"
                    name="enrollment"
                    disabled={isReadOnly}
                    defaultValue={initialData?.enrollment || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Geography</label>
                  <input
                    type="text"
                    name="geography"
                    disabled={isReadOnly}
                    defaultValue={initialData?.geography || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Indication Details</label>
                <input
                  type="text"
                  name="indication"
                  disabled={isReadOnly}
                  defaultValue={initialData?.indication || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>

          {/* Section 3: Timeline & Results */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Timeline & Results
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.start_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Primary Completion</label>
                  <input
                    type="date"
                    name="primary_completion_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.primary_completion_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Completion Date</label>
                  <input
                    type="date"
                    name="completion_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.completion_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Primary Endpoint</label>
                <textarea
                  name="primary_endpoint"
                  rows={2}
                  disabled={isReadOnly}
                  defaultValue={initialData?.primary_endpoint || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Result Summary</label>
                <textarea
                  name="result_summary"
                  rows={3}
                  disabled={isReadOnly}
                  defaultValue={initialData?.result_summary || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 py-5 flex justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-brand-navy)] shadow-sm hover:bg-[var(--color-bg)] focus:outline-none"
        >
          {isReadOnly ? 'Close' : 'Cancel'}
        </button>
        {!isReadOnly && (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#128a88] focus:outline-none disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
    </form>
  );
}
