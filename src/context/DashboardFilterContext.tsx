'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface FilterState {
  therapeuticArea: string;
  indication: string;
  cancerType: string;
  drug: string;
  developmentPhase: string;
  moleculeType: string;
  sponsor: string;
}

export const defaultFilters: FilterState = {
  therapeuticArea: 'All',
  indication: 'All',
  cancerType: 'All',
  drug: 'All',
  developmentPhase: 'All',
  moleculeType: 'All',
  sponsor: 'All',
};

interface FilterContextType {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  isPending: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function FilterProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = React.useTransition();

  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      therapeuticArea: searchParams.get('therapeuticArea') || defaultFilters.therapeuticArea,
      indication: searchParams.get('indication') || defaultFilters.indication,
      cancerType: searchParams.get('cancerType') || defaultFilters.cancerType,
      drug: searchParams.get('drug') || defaultFilters.drug,
      developmentPhase: searchParams.get('developmentPhase') || defaultFilters.developmentPhase,
      moleculeType: searchParams.get('moleculeType') || defaultFilters.moleculeType,
      sponsor: searchParams.get('sponsor') || defaultFilters.sponsor,
    };
  });

  const updateUrl = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === 'All') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  const setFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    updateUrl(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters, isPending }}>
      {children}
    </FilterContext.Provider>
  );
}

export function DashboardFilterProvider({ children }: { children: ReactNode }) {
  const fallbackValue = {
    filters: defaultFilters,
    setFilter: () => {},
    resetFilters: () => {},
    isPending: false
  };

  return (
    <Suspense fallback={
      <FilterContext.Provider value={fallbackValue}>
        {children}
      </FilterContext.Provider>
    }>
      <FilterProviderInner>{children}</FilterProviderInner>
    </Suspense>
  );
}

export function useDashboardFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useDashboardFilter must be used within a DashboardFilterProvider');
  }
  return context;
}
