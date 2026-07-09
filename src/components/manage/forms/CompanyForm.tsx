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

        <div className="space-y-4">
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-slate-700">Company Name *</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              required
              disabled={isReadOnly}
              defaultValue={initialData?.company_name || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div>
            <label htmlFor="company_type" className="block text-sm font-medium text-slate-700">Company Type</label>
            <input
              type="text"
              id="company_type"
              name="company_type"
              disabled={isReadOnly}
              defaultValue={initialData?.company_type || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div>
            <label htmlFor="headquarters" className="block text-sm font-medium text-slate-700">Headquarters</label>
            <input
              type="text"
              id="headquarters"
              name="headquarters"
              disabled={isReadOnly}
              defaultValue={initialData?.headquarters || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-slate-700">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              disabled={isReadOnly}
              defaultValue={initialData?.website || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              disabled={isReadOnly}
              defaultValue={initialData?.description || ''}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)] sm:text-sm disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 py-5 flex justify-end gap-3 mt-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2"
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
