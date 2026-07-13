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

export function QuickAddForm({ initialData, companies, mode, onSuccess, onCancel }: DrugFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isNewCompany, setIsNewCompany] = useState(false);

  const isReadOnly = mode === 'view';
  const companyOptions = companies.map(c => ({ id: c.id, label: c.company_name }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data: any = {
      drug_name: formData.get('drug_name') as string,
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

    if (isNewCompany) {
      const newName = formData.get('new_company_name') as string;
      if (!newName || newName.trim() === '') {
        setError('Please enter a new company name.');
        return;
      }
      data.new_company_name = newName;
    } else {
      const compId = parseInt(formData.get('company_id') as string);
      if (isNaN(compId)) {
        setError('Please select a company.');
        return;
      }
      data.company_id = compId;
    }
    
    // Quick Add: Primary Indication
    if (mode === 'create') {
      const therapeuticArea = formData.get('therapeutic_area') as string;
      const indication = formData.get('indication') as string;
      const cancerType = formData.get('cancer_type') as string;
      
      if (therapeuticArea || indication || cancerType) {
        data.primary_indication = {
          therapeutic_area: therapeuticArea,
          indication: indication,
          cancer_type: cancerType
        };
      }
    }

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

        <div className="space-y-8">
          
          {/* Section 1: Basic Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Basic Information
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Drug Name *</label>
                <input
                  type="text"
                  name="drug_name"
                  required
                  disabled={isReadOnly}
                  defaultValue={initialData?.drug_name || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)]">Company *</label>
                  {!isReadOnly && mode === 'create' && (
                    <button
                      type="button"
                      onClick={() => setIsNewCompany(!isNewCompany)}
                      className="text-xs text-[var(--color-brand-primary)] hover:underline focus:outline-none"
                    >
                      {isNewCompany ? 'Select Existing Company' : '+ Create New Company'}
                    </button>
                  )}
                </div>
                {isNewCompany ? (
                  <input
                    type="text"
                    name="new_company_name"
                    required
                    disabled={isReadOnly}
                    placeholder="Enter new company name..."
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                ) : (
                  <RelationshipSelect 
                    id="company_id"
                    name="company_id"
                    options={companyOptions}
                    defaultValue={initialData?.company_id}
                    disabled={isReadOnly}
                    required={!isNewCompany}
                    placeholder="Select a company..."
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Generic Name</label>
                  <input
                    type="text"
                    name="generic_name"
                    disabled={isReadOnly}
                    defaultValue={initialData?.generic_name || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Internal Code</label>
                  <input
                    type="text"
                    name="internal_code"
                    disabled={isReadOnly}
                    defaultValue={initialData?.internal_code || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Quick Add: Primary Indication (Only shown on create) */}
          {mode === 'create' && (
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2 flex items-center justify-between">
                <span>Quick Add: Primary Indication <span className="text-xs font-normal text-[var(--color-muted)] normal-case ml-2">(Optional - can add more later)</span></span>
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-border)]">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Therapeutic Area</label>
                  <input
                    type="text"
                    name="therapeutic_area"
                    placeholder="e.g. Oncology"
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Cancer Type</label>
                  <input
                    type="text"
                    name="cancer_type"
                    placeholder="e.g. NSCLC"
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Indication Details</label>
                  <input
                    type="text"
                    name="indication"
                    placeholder="e.g. 1st line metastatic"
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm"
                  />
                </div>
              </div>
            </fieldset>
          )}

          {/* Section 2: Scientific Profile */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Scientific Profile
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Molecule Type</label>
                  <input
                    type="text"
                    name="molecule_type"
                    disabled={isReadOnly}
                    defaultValue={initialData?.molecule_type || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Target</label>
                  <input
                    type="text"
                    name="target"
                    disabled={isReadOnly}
                    defaultValue={initialData?.target || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Mechanism of Action</label>
                <input
                  type="text"
                  name="mechanism_of_action"
                  disabled={isReadOnly}
                  defaultValue={initialData?.mechanism_of_action || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>

          {/* Section 3: Development Status */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Development Status
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Development Phase</label>
                  <select
                    name="development_phase"
                    disabled={isReadOnly}
                    defaultValue={initialData?.development_phase || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
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
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Approval Status</label>
                  <select
                    name="approval_status"
                    disabled={isReadOnly}
                    defaultValue={initialData?.approval_status || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  >
                    <option value="">Select status...</option>
                    <option value="Investigational">Investigational</option>
                    <option value="Approved">Approved</option>
                    <option value="Withdrawn">Withdrawn</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Expected Launch Date</label>
                  <input
                    type="date"
                    name="expected_launch_date"
                    disabled={isReadOnly}
                    defaultValue={initialData?.expected_launch_date || ''}
                    className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </fieldset>
          
          {/* Section 4: Designations & Notes */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Designations & Notes
            </legend>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-3">Designations</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input id="first_in_class" name="first_in_class" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.first_in_class || false} className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                    <label htmlFor="first_in_class" className="ml-2 block text-sm text-[var(--color-brand-navy)]">First in Class</label>
                  </div>
                  <div className="flex items-center">
                    <input id="orphan_designation" name="orphan_designation" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.orphan_designation || false} className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                    <label htmlFor="orphan_designation" className="ml-2 block text-sm text-[var(--color-brand-navy)]">Orphan Designation</label>
                  </div>
                  <div className="flex items-center">
                    <input id="fast_track" name="fast_track" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.fast_track || false} className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                    <label htmlFor="fast_track" className="ml-2 block text-sm text-[var(--color-brand-navy)]">Fast Track</label>
                  </div>
                  <div className="flex items-center">
                    <input id="breakthrough_designation" name="breakthrough_designation" type="checkbox" disabled={isReadOnly} defaultChecked={initialData?.breakthrough_designation || false} className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]" />
                    <label htmlFor="breakthrough_designation" className="ml-2 block text-sm text-[var(--color-brand-navy)]">Breakthrough Designation</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  disabled={isReadOnly}
                  defaultValue={initialData?.description || ''}
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
