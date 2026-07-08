import React from 'react';
import { getDrugById } from '@/services/drugs.service';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function DrugDetailsPage({ params }: { params: { id: string } }) {
  // Fix for Next.js 16 - Await params before using its properties
  const { id } = await params;
  const drug = await getDrugById(id);

  if (!drug) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/pipeline" className="text-sm text-[var(--color-brand-primary)] hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Back to Pipeline
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[var(--color-brand-navy)]">{drug.drug_name}</h1>
          <StatusBadge status={drug.development_phase} />
        </div>
        {drug.company && (
          <p className="text-lg text-[var(--color-muted)] mt-1">
            <Link href={`/companies/${drug.company.id}`} className="hover:text-[var(--color-brand-primary)] transition-colors">
              {drug.company.company_name}
            </Link>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                {drug.description || 'No description available for this asset.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target</p>
                  <p className="font-medium text-[var(--color-brand-navy)] mt-1">{drug.target || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Molecule Type</p>
                  <p className="font-medium text-[var(--color-brand-navy)] mt-1">{drug.molecule_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Internal Code</p>
                  <p className="font-medium text-[var(--color-brand-navy)] mt-1">{drug.internal_code || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expected Launch</p>
                  <p className="font-medium text-[var(--color-brand-navy)] mt-1">{formatDate(drug.expected_launch_date)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mechanism of Action</p>
                  <p className="font-medium text-[var(--color-brand-navy)] mt-1">{drug.mechanism_of_action || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Designations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">First in Class</span>
                  <span className="font-medium">{drug.first_in_class ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">Orphan Designation</span>
                  <span className="font-medium">{drug.orphan_designation ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">Fast Track</span>
                  <span className="font-medium">{drug.fast_track ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">Breakthrough</span>
                  <span className="font-medium">{drug.breakthrough_designation ? 'Yes' : 'No'}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
