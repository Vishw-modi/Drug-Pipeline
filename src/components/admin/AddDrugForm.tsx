'use client';

import React, { useState, useTransition } from 'react';
import { Company } from '@/types/company';
import { addDrug } from '@/app/actions/drug.actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AddDrugFormProps {
  companies: Company[];
}

export function AddDrugForm({ companies }: AddDrugFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        const result = await addDrug(formData);
        
        if (result.error) {
          setError(result.error);
        } else if (result.success) {
          setSuccess(true);
          // Optional: reset form
          (e.target as HTMLFormElement).reset();
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add New Drug</CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
            Drug successfully added to the database!
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="drug_name" className="text-sm font-medium text-slate-700">Drug Name *</label>
              <input 
                id="drug_name"
                name="drug_name"
                type="text" 
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                placeholder="e.g. Pembrolizumab"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company_id" className="text-sm font-medium text-slate-700">Company *</label>
              <select
                id="company_id"
                name="company_id"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] bg-white"
              >
                <option value="">Select a company...</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.company_name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="generic_name" className="text-sm font-medium text-slate-700">Generic Name</label>
              <input 
                id="generic_name"
                name="generic_name"
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                placeholder="Optional"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="development_phase" className="text-sm font-medium text-slate-700">Development Phase</label>
              <select
                id="development_phase"
                name="development_phase"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] bg-white"
              >
                <option value="">Select Phase...</option>
                <option value="Discovery">Discovery</option>
                <option value="Preclinical">Preclinical</option>
                <option value="Phase I">Phase I</option>
                <option value="Phase II">Phase II</option>
                <option value="Phase III">Phase III</option>
                <option value="Filed">Filed</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="molecule_type" className="text-sm font-medium text-slate-700">Molecule Type</label>
              <input 
                id="molecule_type"
                name="molecule_type"
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                placeholder="e.g. Monoclonal Antibody"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="target" className="text-sm font-medium text-slate-700">Target</label>
              <input 
                id="target"
                name="target"
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                placeholder="e.g. PD-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
            <textarea 
              id="description"
              name="description"
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
              placeholder="Detailed description of the drug..."
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-[var(--color-brand-primary)] hover:bg-[#128a88] text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Saving...' : 'Add Drug'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
