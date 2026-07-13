'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Building2, MapPin, Globe, Pill, ArrowRight } from 'lucide-react';
import { CompanyWithStats } from '@/services/companies.service';
import { cn } from '@/lib/utils';

interface CompaniesDirectoryProps {
  initialCompanies: CompanyWithStats[];
}

export function CompaniesDirectory({ initialCompanies }: CompaniesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = initialCompanies.filter(company => 
    company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (company.headquarters && company.headquarters.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-[var(--color-muted)]" />
        </div>
        <input
          type="text"
          placeholder="Search companies by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
          suppressHydrationWarning
        />
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCompanies.map(company => (
            <Link 
              key={company.id} 
              href={`/companies/${company.id}`}
              className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 hover:border-[var(--color-brand-primary)]/40 flex flex-col h-full"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                    <Building2 size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-[var(--color-brand-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <span className="text-xs font-semibold">View</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
                
                <h3 className="font-bold text-[var(--color-text-main)] text-lg mb-1 group-hover:text-[var(--color-brand-primary)] transition-colors line-clamp-1">
                  {company.company_name}
                </h3>
                
                <div className="space-y-2 mt-3 text-sm text-[var(--color-muted)] flex-1">
                  {company.headquarters && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="shrink-0" />
                      <span className="truncate">{company.headquarters}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="shrink-0" />
                      <span className="truncate">{company.website.replace(/^https?:\/\//, '')}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-main)] font-medium">
                    <Pill size={16} className="text-teal-500" />
                    <span>{company.total_drugs}</span>
                    <span className="text-[var(--color-muted)] font-normal text-xs ml-0.5">Drugs</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
          <Building2 size={32} className="mx-auto text-[var(--color-muted)] opacity-50 mb-3" />
          <h3 className="text-lg font-medium text-[var(--color-text-main)] mb-1">No companies found</h3>
          <p className="text-[var(--color-muted)] text-sm">We couldn't find any companies matching your search.</p>
        </div>
      )}
    </div>
  );
}
