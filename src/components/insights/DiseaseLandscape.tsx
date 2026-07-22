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
              <span className="ml-auto text-xs font-medium text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                {subtypes.length}
              </span>
            )}
          </div>
          {subtypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {subtypes.map((subtype: string) => (
                <span 
                  key={subtype} 
                  className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary text-sm font-medium rounded-md border border-brand-primary/20"
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
              <span className="ml-auto text-xs font-medium text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                {biomarkers.length}
              </span>
            )}
          </div>
          {biomarkers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {biomarkers.map((biomarker: string) => (
                <span 
                  key={biomarker} 
                  className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-medium rounded-md border border-purple-200"
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
