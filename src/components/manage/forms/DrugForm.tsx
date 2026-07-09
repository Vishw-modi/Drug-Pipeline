'use client';

import React, { useState, useTransition } from 'react';
import { Drug } from '@/types/drug';
import { Company } from '@/types/company';
import { createDrug, updateDrug } from '@/app/actions/manage.actions';
import { RelationshipSelect } from '@/components/manage/fields/RelationshipSelect';

interface DrugFormProps {
  initialData?: Drug | null;
  companies: Company[];
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function DrugForm({ initialData, companies, mode, onSuccess, onCancel }: DrugFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isReadOnly = mode === 'view';
  const companyOptions = companies.map(c => ({ id: c.id, label: c.company_name }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = {
      drug_name: formData.get('drug_name') as string,
      company_id: parseInt(formData.get('company_id') as string),
      generic_name: formData.get('generic_name') as string || null,
      internal_code: formData.get('internal_code') as string || null,
      molecule_type: formData.get('molecule_type') as string || null,
      target: formData.get('target') as string || null,
      mechanism_of_action: formData.get('mechanism_of_action') as string || null,
      development_phase: formData.get('development_phase') as string || null,
      approval_status: formData.get('approval_status') as string || null,
      expected_launch_date: formData.get('expected_launch_date') as string || null,
      description: formData.get('description') as string || null,
      first_in_class: formData.get('first_in_class') === 'on',
      orphan_designation: formData.get('orphan_designation') === 'on',
      fast_track: formData.get('fast_track') === 'on',
      breakthrough_designation: formData.get('breakthrough_designation') === 'on',
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateDrug(initialData.id, data);
      } else {
        result = await createDrug(data);
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
            <label className="block text-sm font-medium text-slate-700">Drug Name *</label>
            <input
              type="text"
              name="drug_name"
              required
              disabled={isReadOnly}
              defaultValue={initialData?.drug_name || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Company *</label>
            <div className="mt-1">
              <RelationshipSelect 
                id="company_id"
                name="company_id"
                options={companyOptions}
                defaultValue={initialData?.company_id}
                disabled={isReadOnly}
                required
                placeholder="Select a company..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Generic Name</label>
              <input
                type="text"
                name="generic_name"
                disabled={isReadOnly}
                defaultValue={initialData?.generic_name || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Internal Code</label>
              <input
                type="text"
                name="internal_code"
                disabled={isReadOnly}
                defaultValue={initialData?.internal_code || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Molecule Type</label>
              <input
                type="text"
                name="molecule_type"
                disabled={isReadOnly}
                defaultValue={initialData?.molecule_type || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Target</label>
              <input
                type="text"
                name="target"
                disabled={isReadOnly}
                defaultValue={initialData?.target || ''}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Mechanism of Action</label>
            <input
              type="text"
              name="mechanism_of_action"
              disabled={isReadOnly}
              defaultValue={initialData?.mechanism_of_action || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Development Phase</label>
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
              <label className="block text-sm font-medium text-slate-700">Approval Status</label>
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
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Expected Launch Date</label>
            <input
              type="date"
              name="expected_launch_date"
              disabled={isReadOnly}
              defaultValue={initialData?.expected_launch_date || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Designations</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="first_in_class" name="first_in_class" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.first_in_class || false} className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                <label htmlFor="first_in_class" className="ml-2 block text-sm text-slate-700">First in Class</label>
              </div>
              <div className="flex items-center">
                <input id="orphan_designation" name="orphan_designation" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.orphan_designation || false} className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                <label htmlFor="orphan_designation" className="ml-2 block text-sm text-slate-700">Orphan Designation</label>
              </div>
              <div className="flex items-center">
                <input id="fast_track" name="fast_track" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.fast_track || false} className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                <label htmlFor="fast_track" className="ml-2 block text-sm text-slate-700">Fast Track</label>
              </div>
              <div className="flex items-center">
                <input id="breakthrough_designation" name="breakthrough_designation" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.breakthrough_designation || false} className="h-4 w-4 rounded border-slate-300 text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                <label htmlFor="breakthrough_designation" className="ml-2 block text-sm text-slate-700">Breakthrough Designation</label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              name="description"
              rows={3}
              disabled={isReadOnly}
              defaultValue={initialData?.description || ''}
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
