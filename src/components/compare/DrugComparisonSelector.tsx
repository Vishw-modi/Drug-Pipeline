'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, ChevronDown, Check } from 'lucide-react';

interface DrugMinimal {
  id: number;
  drug_name: string;
}

interface DrugComparisonSelectorProps {
  availableDrugs: DrugMinimal[];
}

export function DrugComparisonSelector({ availableDrugs }: DrugComparisonSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedIdsParams = searchParams.get('drugs');
  const selectedIds = selectedIdsParams ? selectedIdsParams.split(',').map(id => parseInt(id, 10)) : [];
  
  const selectedDrugs = availableDrugs.filter(d => selectedIds.includes(d.id));
  
  const filteredDrugs = query === '' 
    ? availableDrugs 
    : availableDrugs.filter(drug => drug.drug_name.toLowerCase().includes(query.toLowerCase()));

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDrug = (id: number) => {
    const newSelected = selectedIds.includes(id) 
      ? selectedIds.filter(selId => selId !== id)
      : [...selectedIds, id];
      
    updateUrl(newSelected);
  };

  const updateUrl = (newIds: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newIds.length > 0) {
      params.set('drugs', newIds.join(','));
    } else {
      params.delete('drugs');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full mb-8">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-navy mb-4">Select Drugs to Compare</h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="relative w-full md:w-96" ref={dropdownRef}>
            <div 
              className="flex items-center w-full border border-slate-300 rounded-lg bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-brand-primary cursor-text"
              onClick={() => setIsOpen(true)}
            >
              <Search className="text-muted mr-2" size={18} />
              <input
                type="text"
                className="w-full bg-transparent outline-none text-sm text-brand-navy"
                placeholder="Search drugs..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
              />
              <ChevronDown className="text-muted ml-2 cursor-pointer" size={18} onClick={() => setIsOpen(!isOpen)} />
            </div>

            {isOpen && (
              <div className="absolute z-50 w-full mt-1 bg-surface border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredDrugs.length === 0 ? (
                  <div className="p-3 text-sm text-muted">No drugs found.</div>
                ) : (
                  filteredDrugs.map(drug => {
                    const isSelected = selectedIds.includes(drug.id);
                    return (
                      <div 
                        key={drug.id}
                        className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-slate-50 ${isSelected ? 'bg-brand-primary/5 text-brand-primary font-medium' : 'text-brand-navy'}`}
                        onClick={() => toggleDrug(drug.id)}
                      >
                        {drug.drug_name}
                        {isSelected && <Check size={16} className="text-brand-primary" />}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-wrap gap-2">
            {selectedDrugs.map(drug => (
              <div key={drug.id} className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-sm font-medium border border-brand-primary/20">
                {drug.drug_name}
                <button 
                  onClick={() => toggleDrug(drug.id)}
                  className="hover:bg-brand-primary/20 rounded-full p-0.5 ml-1 transition-colors focus:outline-none"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {selectedDrugs.length === 0 && (
              <div className="text-sm text-muted py-2 flex items-center">
                No drugs selected yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
