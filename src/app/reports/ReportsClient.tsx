'use client';

import React, { useState } from 'react';
import { Drug } from '@/types/drug';
import { Card } from '@/components/ui/card';
import { Search, X, FileText, AlertCircle } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface ReportsClientProps {
  initialDrugs: Drug[];
}

export function ReportsClient({ initialDrugs }: ReportsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const filteredDrugs = initialDrugs.filter(drug => 
    drug.drug_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (drug.generic_name && drug.generic_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search drugs by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] text-[var(--color-brand-navy)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDrugs.map(drug => {
          const hasPI = !!drug.pi_link;
          return (
            <Card 
              key={drug.id} 
              className={`flex flex-col p-5 border-[var(--color-border)] bg-[var(--color-surface)] transition-all ${
                hasPI 
                  ? 'cursor-pointer hover:shadow-md hover:border-[var(--color-brand-primary)]' 
                  : 'opacity-75'
              }`}
              onClick={() => {
                if (hasPI) {
                  setIsPdfLoading(true);
                  setSelectedDrug(drug);
                }
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <StatusBadge status={drug.development_phase} />
                {hasPI ? (
                  <div className="text-[var(--color-brand-primary)] flex items-center gap-1 text-xs font-medium bg-[var(--color-brand-primary)]/10 px-2 py-1 rounded-full">
                    <FileText size={14} /> PI Available
                  </div>
                ) : (
                  <div className="text-[var(--color-muted)] flex items-center gap-1 text-xs font-medium bg-[var(--color-bg)] px-2 py-1 rounded-full">
                    <AlertCircle size={14} /> No PI
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-[var(--color-brand-navy)]">
                {drug.brand_name || drug.drug_name}
              </h3>
              {drug.generic_name && (
                <p className="text-sm text-[var(--color-muted)] mt-1">{drug.generic_name}</p>
              )}
              {drug.company && (
                <p className="text-xs text-[var(--color-muted)] mt-2 line-clamp-1 border-t border-[var(--color-border)] pt-2">
                  {drug.company.company_name}
                </p>
              )}
            </Card>
          );
        })}
        {filteredDrugs.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-muted)]">
            No drugs found matching your search.
          </div>
        )}
      </div>

      {/* PDF Modal */}
      {selectedDrug && selectedDrug.pi_link && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-brand-navy)]">
                  {selectedDrug.brand_name || selectedDrug.drug_name} - Prescribing Information
                </h2>
                {selectedDrug.company && (
                  <p className="text-sm text-[var(--color-muted)]">{selectedDrug.company.company_name}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedDrug(null)}
                className="p-2 rounded-full hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-brand-navy)] transition-colors"
                title="Close PDF"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body / Iframe */}
            <div 
              className="flex-1 bg-[var(--color-bg)] relative w-full h-full overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {isPdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-brand-primary)] animate-spin"></div>
                    <FileText className="absolute text-[var(--color-brand-primary)] animate-pulse" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--color-brand-navy)] mt-6 animate-pulse">Loading Document...</h3>
                  <p className="text-sm text-[var(--color-muted)] mt-2">Fetching FDA Prescribing Information securely</p>
                </div>
              )}
              <iframe
                src={`/api/pdf?url=${encodeURIComponent(selectedDrug.pi_link)}`}
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isPdfLoading ? 'opacity-0' : 'opacity-100'}`}
                title={`${selectedDrug.drug_name} Prescribing Information`}
                onLoad={() => setIsPdfLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
