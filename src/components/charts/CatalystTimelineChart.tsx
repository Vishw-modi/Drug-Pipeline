'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useDashboardFilter } from '@/context/DashboardFilterContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CatalystTimelineChartProps {
  data: any[];
}

export function CatalystTimelineChart({ data }: CatalystTimelineChartProps) {
  const { filters, setFilter } = useDashboardFilter();
  const targetMonths = filters.targetMonths ? filters.targetMonths.split(',').filter(Boolean) : [];

  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [animatingMonth, setAnimatingMonth] = useState<string | null>(null);
  
  // Pagination offset (in increments of 12 months)
  const [offsetMonths, setOffsetMonths] = useState(0);

  // Generate 12 months starting from January of the current year + offset
  const { months, maxCount } = useMemo(() => {
    let startDate = new Date(); // Start from today
    
    // Force start date to January
    startDate.setMonth(0);
    
    // Apply pagination offset
    startDate.setMonth(startDate.getMonth() + offsetMonths);
    
    // Ensure we start at the 1st of the month
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const generated = [];
    let currentMax = 0;

    for (let i = 0; i < 12; i++) {
      const d = new Date(startDate);
      d.setMonth(d.getMonth() + i);
      
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      
      // Filter catalysts for this month
      const monthCatalysts = data.filter(c => {
        const cDate = new Date(c.expected_date);
        return cDate.getFullYear() === d.getFullYear() && cDate.getMonth() === d.getMonth();
      });

      // Breakdown by event type
      const breakdown = monthCatalysts.reduce((acc, curr) => {
        const type = curr.event_type || 'Other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Breakdown by companies
      const companies = new Set(monthCatalysts.map(c => c.company_name).filter(Boolean)).size;

      const count = monthCatalysts.length;
      if (count > currentMax) currentMax = count;

      generated.push({
        date: d,
        monthStr,
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        year: d.getFullYear(),
        count,
        breakdown,
        companies
      });
    }

    return { months: generated, maxCount: currentMax };
  }, [data, offsetMonths]);

  const handleNodeClick = (monthStr: string, e: React.MouseEvent) => {
    setAnimatingMonth(monthStr);
    const multiSelect = e.shiftKey || e.ctrlKey || e.metaKey;
    
    // Animate first, then fire callback
    setTimeout(() => {
      let newMonths = [...targetMonths];
      if (multiSelect) {
        if (newMonths.includes(monthStr)) {
          newMonths = newMonths.filter(m => m !== monthStr);
        } else {
          newMonths.push(monthStr);
        }
      } else {
        if (newMonths.length === 1 && newMonths[0] === monthStr) {
          newMonths = []; // Toggle off if it's the only one
        } else {
          newMonths = [monthStr];
        }
      }
      
      setFilter('targetMonths', newMonths.join(','));
      setAnimatingMonth(null);
    }, 300);
  };

  const handlePrevYear = () => setOffsetMonths(prev => prev - 12);
  const handleNextYear = () => setOffsetMonths(prev => prev + 12);

  const today = new Date();
  
  return (
    <div className="w-full py-8 px-4 relative flex flex-col items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm mb-6 mt-2">
      
      {/* Pagination Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button 
          onClick={handlePrevYear}
          className="p-1.5 rounded-md text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-brand-primary)] transition-colors border border-[var(--color-border)] shadow-sm"
          title="Previous 12 Months"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="text-xs font-semibold text-[var(--color-brand-navy)] px-2">
          {months[0]?.year}
        </div>
        <button 
          onClick={handleNextYear}
          className="p-1.5 rounded-md text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-brand-primary)] transition-colors border border-[var(--color-border)] shadow-sm"
          title="Next 12 Months"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="w-full max-w-5xl relative flex items-center h-32 mt-4">
        {/* Continuous background line */}
        <div className="absolute left-0 right-0 h-0.5 bg-[var(--color-border)] top-1/2 -translate-y-1/2 z-0" />

        {/* Months nodes */}
        <div className="flex justify-between w-full relative z-10 px-4">
          {months.map((m) => {
            const isSelected = targetMonths.includes(m.monthStr);
            const isAnimating = animatingMonth === m.monthStr;
            const isHovered = hoveredMonth === m.monthStr;
            const isMostActive = m.count > 0 && m.count === maxCount;

            // Proportional size: 0 count = small, max count = large
            // min size = 12px (w-3 h-3)
            // max size = 32px (w-8 h-8)
            const minSize = 12;
            const maxSize = 32;
            const size = maxCount === 0 || m.count === 0 
              ? minSize 
              : minSize + ((m.count / maxCount) * (maxSize - minSize));

            // Today marker indicator
            const isThisMonth = today.getFullYear() === m.date.getFullYear() && today.getMonth() === m.date.getMonth();

            return (
              <div 
                key={m.monthStr}
                className="flex flex-col items-center justify-center relative group cursor-pointer"
                onMouseEnter={() => setHoveredMonth(m.monthStr)}
                onMouseLeave={() => setHoveredMonth(null)}
                onClick={(e) => handleNodeClick(m.monthStr, e)}
              >
                {/* Month Label */}
                <span className={`absolute -top-12 text-sm font-medium transition-colors ${isSelected ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-muted)]'}`}>
                  {m.label}
                  {m.date.getMonth() === 0 && <span className="text-xs ml-1 opacity-70">'{String(m.year).slice(-2)}</span>}
                </span>

                {/* Today Marker */}
                {isThisMonth && (
                  <div className="absolute -top-20 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[var(--color-brand-coral)] uppercase tracking-wider mb-1">Today</span>
                    <div className="w-px h-20 bg-[var(--color-brand-coral)]" />
                  </div>
                )}

                {/* The Node */}
                <div 
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${isAnimating ? 'scale-125 shadow-[0_0_15px_var(--color-brand-primary)]' : 'scale-100'} ${isSelected ? 'z-20' : 'z-10 hover:z-20'}`}
                  style={{ width: size, height: size }}
                >
                  {/* Outer Ring for selected state */}
                  {isSelected && (
                    <div className="absolute -inset-2 border-2 border-[var(--color-brand-primary)] rounded-full animate-in zoom-in duration-200" />
                  )}
                  
                  {/* Outer Ring for intensity (very busy months) */}
                  {!isSelected && isMostActive && (
                    <div className="absolute -inset-1.5 border border-[var(--color-brand-primary)] opacity-40 rounded-full" />
                  )}

                  <div 
                    className={`w-full h-full rounded-full transition-colors duration-200 ${
                      isSelected 
                        ? 'bg-[var(--color-brand-primary)]' 
                        : m.count > 0 
                          ? 'bg-[var(--color-brand-primary)] opacity-50 group-hover:opacity-80' 
                          : 'bg-slate-300'
                    }`}
                  />
                  
                  {/* Inner dot for empty nodes */}
                  {m.count === 0 && (
                    <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>

                {/* Tooltip */}
                {isHovered && m.count > 0 && (
                  <div className="absolute top-12 z-50 min-w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg p-3 animate-in fade-in slide-in-from-top-2">
                    <div className="font-semibold text-[var(--color-brand-navy)] mb-1">
                      {m.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-[var(--color-brand-primary)] font-bold mb-2 pb-2 border-b border-[var(--color-border)]">
                      {m.count} Catalyst{m.count !== 1 && 's'}
                    </div>
                    
                    <ul className="text-sm text-[var(--color-muted)] space-y-1 mb-2">
                      {Object.entries(m.breakdown).map(([type, c]) => (
                        <li key={type} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted)] opacity-50"></span>
                          <span className="font-medium text-[var(--color-brand-navy)]">{c}</span> {type}
                        </li>
                      ))}
                    </ul>
                    
                    {isMostActive && (
                      <div className="text-xs font-semibold text-[var(--color-brand-coral)] mt-2 pt-2 border-t border-[var(--color-border)]">
                        Highest Activity Month
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Month Summary Panel (shows when selected) */}
      {targetMonths.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] w-full max-w-5xl flex gap-4 overflow-x-auto pb-2">
          {targetMonths.map(monthStr => {
            const mData = months.find(m => m.monthStr === monthStr);
            if (!mData) return null;
            return (
              <div key={monthStr} className="min-w-64 flex-1 bg-[var(--color-surface)] border border-[var(--color-brand-primary)]/30 rounded-lg p-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-brand-primary)]" />
                <h4 className="font-bold text-lg text-[var(--color-brand-navy)]">
                  {mData.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="text-sm font-semibold text-[var(--color-brand-primary)] mb-3 pb-2 border-b border-[var(--color-border)]">
                  {mData.count} Catalyst{mData.count !== 1 && 's'}
                </div>
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-[var(--color-muted)]">
                  <div>
                    <span className="font-medium text-[var(--color-brand-navy)]">{mData.companies}</span> Companies
                  </div>
                  {Object.entries(mData.breakdown).slice(0, 5).map(([type, c]) => (
                    <div key={type} className="truncate" title={type}>
                      <span className="font-medium text-[var(--color-brand-navy)]">{c}</span> {type}
                    </div>
                  ))}
                  {Object.keys(mData.breakdown).length > 5 && (
                    <div className="text-xs italic col-span-2">+{Object.keys(mData.breakdown).length - 5} more types...</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
