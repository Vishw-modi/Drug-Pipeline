'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhaseTab {
  id: string;
  label: string;
  count: number;
}

interface DevelopmentPhaseTabsProps {
  phases: PhaseTab[];
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
}

export function DevelopmentPhaseTabs({ phases, activePhase, onPhaseChange }: DevelopmentPhaseTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [phases]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative flex items-center mb-6">
      {showLeftScroll && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 p-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-surface-hover)] transition-colors"
          style={{ transform: 'translateX(-50%)' }}
        >
          <ChevronLeft size={16} className="text-[var(--color-muted)]" />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => onPhaseChange(phase.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 border text-sm font-medium",
              activePhase === phase.id
                ? "bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-sm"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-brand-navy)] hover:border-[var(--color-brand-primary)]/50 hover:bg-[var(--color-brand-primary)]/5"
            )}
          >
            <span>{phase.label}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold",
              activePhase === phase.id
                ? "bg-white/20 text-white"
                : "bg-[var(--color-bg)] text-[var(--color-muted)]"
            )}>
              {phase.count}
            </span>
          </button>
        ))}
      </div>

      {showRightScroll && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 p-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-surface-hover)] transition-colors"
          style={{ transform: 'translateX(50%)' }}
        >
          <ChevronRight size={16} className="text-[var(--color-muted)]" />
        </button>
      )}
    </div>
  );
}
