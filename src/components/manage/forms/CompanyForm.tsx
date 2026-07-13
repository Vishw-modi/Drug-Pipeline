'use client';

import React, { useState, useTransition } from 'react';
import { Company } from '@/types/company';
import { createCompany, updateCompany } from '@/app/actions/manage.actions';

interface CompanyFormProps {
  initialData?: Company | null;
  mode: 'create' | 'edit' | 'view';
  onSuccess: () => void;
  onCancel: () => void;
}

export function CompanyForm({ initialData, mode, onSuccess, onCancel }: CompanyFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isReadOnly = mode === 'view';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReadOnly) return;
    
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = {
      company_name: formData.get('company_name') as string,
      company_type: formData.get('company_type') as string || null,
      headquarters: formData.get('headquarters') as string || null,
      website: formData.get('website') as string || null,
      description: formData.get('description') as string || null,
    };

    startTransition(async () => {
      let result;
      if (mode === 'edit' && initialData) {
        result = await updateCompany(initialData.id, data);
      } else {
        result = await createCompany(data);
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
          
          {/* Section 1: Company Details */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Company Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Company Name *</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  required
                  disabled={isReadOnly}
                  defaultValue={initialData?.company_name || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="company_type" className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Company Type</label>
                <input
                  type="text"
                  id="company_type"
                  name="company_type"
                  disabled={isReadOnly}
                  defaultValue={initialData?.company_type || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Location & Contact */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Location & Contact
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="headquarters" className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Headquarters</label>
                <input
                  type="text"
                  id="headquarters"
                  name="headquarters"
                  disabled={isReadOnly}
                  defaultValue={initialData?.headquarters || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  disabled={isReadOnly}
                  defaultValue={initialData?.website || ''}
                  className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </fieldset>

          {/* Section 3: Additional Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-4 border-b border-[var(--color-border)] w-full pb-2">
              Additional Information
            </legend>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[var(--color-brand-navy)] mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                disabled={isReadOnly}
                defaultValue={initialData?.description || ''}
                className="block w-full px-3 py-2 rounded-md border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-brand-navy)] shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:opacity-50"
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 py-5 flex justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--color-brand-navy)] shadow-sm hover:bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2"
        >
          {isReadOnly ? 'Close' : 'Cancel'}
        </button>
        {!isReadOnly && (
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex justify-center rounded-md border border-transparent bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#128a88] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
    </form>
  );
}
