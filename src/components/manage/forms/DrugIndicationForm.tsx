'use client';

import React, { useState, useTransition } from 'react';
import { DrugIndication, Drug } from '@/types/drug';
import { createIndication, updateIndication } from '@/app/actions/manage.actions';
import { RelationshipSelect } from '@/components/manage/fields/RelationshipSelect';

interface DrugIndicationFormProps {
  initialData?: DrugIndication | null;
  drugs: Drug[];
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function DrugIndicationForm({ initialData, drugs, mode, onSuccess, onCancel }: DrugIndicationFormProps) {
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
      therapeutic_area: formData.get('therapeutic_area') as string,
      cancer_type: formData.get('cancer_type') as string,
      indication: formData.get('indication') as string,
      biomarker: formData.get('biomarker') as string || null,
      line_of_therapy: formData.get('line_of_therapy') as string || null,
      development_phase: formData.get('development_phase') as string || null,
      approval_status: formData.get('approval_status') as string || null,
      market_priority: formData.get('market_priority') as string || null,
      is_primary: formData.get('is_primary') === 'on',
      notes: formData.get('notes') as string || null,
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateIndication(initialData.id, data);
      } else {
        result = await createIndication(data);
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Drug *</label>
            <div className="mt-1">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Therapeutic Area *</label>
              <input
                type="text"
                name="therapeutic_area"
                required
                disabled={isReadOnly}
                defaultValue={initialData?.therapeutic_area || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Cancer Type *</label>
              <input
                type="text"
                name="cancer_type"
                required
                disabled={isReadOnly}
                defaultValue={initialData?.cancer_type || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Indication (Full Name) *</label>
            <input
              type="text"
              name="indication"
              required
              disabled={isReadOnly}
              defaultValue={initialData?.indication || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Biomarker</label>
              <input
                type="text"
                name="biomarker"
                disabled={isReadOnly}
                defaultValue={initialData?.biomarker || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Line of Therapy</label>
              <input
                type="text"
                name="line_of_therapy"
                disabled={isReadOnly}
                defaultValue={initialData?.line_of_therapy || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Phase</label>
              <select
                name="development_phase"
                disabled={isReadOnly}
                defaultValue={initialData?.development_phase || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              >
                <option value="">Select phase...</option>
                <option value="Discovery">Discovery</option>
                <option value="Preclinical">Preclinical</option>
                <option value="Phase I">Phase I</option>
                <option value="Phase II">Phase II</option>
                <option value="Phase III">Phase III</option>
                <option value="Filed">Filed</option>
                <option value="Approved">Approved</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                name="approval_status"
                disabled={isReadOnly}
                defaultValue={initialData?.approval_status || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              >
                <option value="">Select status...</option>
                <option value="Investigational">Investigational</option>
                <option value="Approved">Approved</option>
                <option value="Withdrawn">Withdrawn</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Priority</label>
              <select
                name="market_priority"
                disabled={isReadOnly}
                defaultValue={initialData?.market_priority || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              >
                <option value="">Select priority...</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input id="is_primary" name="is_primary" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.is_primary || false} className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
              <label htmlFor="is_primary" className="ml-2 block text-sm font-medium text-slate-700">Primary Indication</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea
              name="notes"
              rows={3}
              disabled={isReadOnly}
              defaultValue={initialData?.notes || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
            />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 py-5 flex justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none"
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
