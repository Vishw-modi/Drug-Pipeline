import React from 'react';
import { Dna, Microscope, Fingerprint } from 'lucide-react';

interface DiseaseLandscapeProps {
  overview: any;
}

export function DiseaseLandscape({ overview }: DiseaseLandscapeProps) {
  const subtypes = overview.key_subtypes || [];
  const biomarkers = overview.common_biomarkers || [];

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-[var(--color-surface-hover)]">
        <h3 className="font-semibold text-brand-navy flex items-center gap-2">
          <Dna size={18} className="text-brand-primary" />
          Disease Landscape
        </h3>
      </div>
      
      <div className="p-6 md:p-8 space-y-6">
        {/* Subtypes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Microscope size={14} className="text-brand-primary" />
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Major Subtypes</h4>
            {subtypes.length > 0 && (
              <span className="ml-auto text-xs font-medium text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                {subtypes.length}
              </span>
            )}
          </div>
          {subtypes.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {subtypes.map((subtype: string) => (
                <span 
                  key={subtype} 
                  className="px-2.5 py-1 bg-brand-primary/5 text-brand-primary text-xs font-semibold tracking-wide rounded-sm"
                >
                  {subtype}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted italic">No data available.</p>
          )}
        </div>

        {/* Biomarkers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Fingerprint size={14} className="text-purple-500" />
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">Key Biomarkers</h4>
            {biomarkers.length > 0 && (
              <span className="ml-auto text-xs font-medium text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                {biomarkers.length}
              </span>
            )}
          </div>
          {biomarkers.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {biomarkers.map((biomarker: string) => (
                <span 
                  key={biomarker} 
                  className="px-2.5 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-semibold tracking-wide rounded-sm"
                >
                  {biomarker}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted italic">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

