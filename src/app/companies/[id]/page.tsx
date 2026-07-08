import React from 'react';
import { getCompanyById } from '@/services/companies.service';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';

export default async function CompanyDetailsPage({ params }: { params: { id: string } }) {
  // Fix for Next.js 16 - Await params before using its properties
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[var(--color-brand-navy)]">{company.company_name}</h1>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-[var(--color-muted)]">
          {company.headquarters && (
            <span className="flex items-center gap-1"><MapPin size={14} /> {company.headquarters}</span>
          )}
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-brand-primary)] transition-colors">
              <Globe size={14} /> {company.website}
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                {company.description || 'No description available for this company.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
