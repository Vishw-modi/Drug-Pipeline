'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  therapeuticArea: string;
  indication: string;
  cancerType: string;
  developmentPhase: string;
  moleculeType: string;
  sponsor: string;
}

const defaultFilters: FilterState = {
  therapeuticArea: 'Oncology',
  indication: 'All',
  cancerType: 'All',
  developmentPhase: 'All',
  moleculeType: 'All',
  sponsor: 'All',
};

interface FilterContextType {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}
