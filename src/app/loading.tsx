import React from 'react';
import { Activity } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded-md mb-2"></div>
          <div className="h-4 w-96 bg-slate-100 rounded-md"></div>
        </div>
      </div>

      {/* KPI Cards / Filter Bar Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5 h-32 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-4 w-24 bg-slate-200 rounded-md"></div>
              <div className="h-8 w-8 bg-slate-100 rounded-md"></div>
            </div>
            <div className="h-8 w-16 bg-slate-200 rounded-md mt-4"></div>
          </div>
        ))}
      </div>

      {/* Main Content / Table Skeleton */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 h-96 flex flex-col items-center justify-center">
        <Activity className="text-slate-300 animate-bounce mb-4" size={48} />
        <div className="h-5 w-48 bg-slate-200 rounded-md mb-2"></div>
        <div className="h-4 w-64 bg-slate-100 rounded-md"></div>
      </div>
    </div>
  );
}
