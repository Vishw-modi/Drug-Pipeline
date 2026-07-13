'use client';

import React, { useState, useTransition } from 'react';
import { Drug } from '@/types/drug';
import { createUpdate, updateUpdate } from '@/app/actions/manage.actions';
import { RelationshipSelect } from '@/components/manage/fields/RelationshipSelect';

interface DrugUpdateFormProps {
  initialData?: any | null; // using any since type isn't fully exported but we know schema
  drugs: Drug[];
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function DrugUpdateForm({ initialData, drugs, mode, onSuccess, onCancel }: DrugUpdateFormProps) {
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
      update_title: formData.get('update_title') as string,
      update_summary: formData.get('update_summary') as string || null,
      update_type: formData.get('update_type') as string || null,
      source: formData.get('source') as string || null,
      source_url: formData.get('source_url') as string || null,
      update_date: formData.get('update_date') as string || null,
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateUpdate(initialData.id, data);
      } else {
        result = await createUpdate(data);
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
          
          {/* Section 1: Update Details */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Update Details
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
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Update Title *</label>
                <input
                  type="text"
                  name="update_title"
                  required
                  disabled={isReadOnly}
                  defaultValue={initialData?.update_title || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Update Type</label>
                  <select
                    name="update_type"
                    disabled={isReadOnly}
                    defaultValue={initialData?.update_type || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select type...</option>
                    <option value="FDA Approval">FDA Approval</option>
                    <option value="FDA Submission">FDA Submission</option>
                    <option value="Clinical Trial Update">Clinical Trial Update</option>
                    <option value="Topline Results">Topline Results</option>
                    <option value="Publication">Publication</option>
                    <option value="Conference Presentation">Conference Presentation</option>
                    <option value="Company Announcement">Company Announcement</option>
                    <option value="Label Expansion">Label Expansion</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Acquisition">Acquisition</option>
                    <option value="Safety Update">Safety Update</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Date</label>
                  <input
                    type="date"
                    name="update_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.update_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Summary</label>
                <textarea
                  name="update_summary"
                  rows={4}
                  disabled={isReadOnly}
                  defaultValue={initialData?.update_summary || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Source Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Source Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Source Name</label>
                <input
                  type="text"
                  name="source"
                  disabled={isReadOnly}
                  defaultValue={initialData?.source || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Source URL</label>
                <input
                  type="url"
                  name="source_url"
                  disabled={isReadOnly}
                  defaultValue={initialData?.source_url || ''}
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
