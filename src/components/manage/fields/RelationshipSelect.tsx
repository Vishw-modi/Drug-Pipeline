'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// We implement a simple searchable dropdown using standard React state since we don't have Radix Popover installed by default.

interface RelationshipSelectProps {
  id: string;
  name: string;
  options: { id: string | number; label: string }[];
  defaultValue?: string | number | null;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export function RelationshipSelect({
  id,
  name,
  options,
  defaultValue,
  disabled = false,
  required = false,
  placeholder = 'Select an option...'
}: RelationshipSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | number | null>(defaultValue || null);

  const filteredOptions = useMemo(() => {
    return options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const selectedOption = options.find(opt => opt.id.toString() === selectedValue?.toString());

  return (
    <div className="relative">
      {/* Hidden input to pass value to form submission */}
      <input type="hidden" name={name} value={selectedValue || ''} required={required} disabled={disabled} />
      
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]",
          disabled && "bg-slate-50 text-slate-500 cursor-not-allowed"
        )}
      >
        <span className={cn("block truncate", !selectedOption && "text-slate-400")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop to close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-slate-200">
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  className="w-full rounded-md border-0 py-1.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-[var(--color-brand-primary)] bg-slate-50"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <ul className="max-h-60 overflow-auto py-1 text-sm">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-slate-500 text-center">No options found.</li>
              ) : (
                filteredOptions.map((opt) => (
                  <li
                    key={opt.id}
                    className={cn(
                      "flex items-center justify-between cursor-pointer select-none px-3 py-2 hover:bg-slate-50",
                      selectedValue?.toString() === opt.id.toString() && "bg-slate-50 text-[var(--color-brand-primary)] font-medium"
                    )}
                    onClick={() => {
                      setSelectedValue(opt.id);
                      setIsOpen(false);
                      setSearch('');
                    }}
                  >
                    <span className="block truncate">{opt.label}</span>
                    {selectedValue?.toString() === opt.id.toString() && (
                      <Check className="h-4 w-4" />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
