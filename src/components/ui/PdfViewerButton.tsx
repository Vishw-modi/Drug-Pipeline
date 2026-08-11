'use client';

import React, { useState } from 'react';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

interface PdfViewerButtonProps {
  url: string;
  drugName: string;
  brandName?: string | null;
  companyName?: string | null;
}

export function PdfViewerButton({ url, drugName, brandName, companyName }: PdfViewerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  return (
    <>
      <button 
        onClick={() => {
          setIsOpen(true);
          setIsPdfLoading(true);
        }}
        className="flex flex-col items-center justify-center gap-2 bg-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] rounded-xl p-4 transition-all hover:shadow-md"
      >
        <FileText size={24} />
        <span className="font-medium text-sm text-center">View Prescribing Information</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--color-surface)] w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-brand-navy)]">
                  {brandName || drugName} - Prescribing Information
                </h2>
                {companyName && (
                  <p className="text-sm text-[var(--color-muted)]">{companyName}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={`/api/pdf?url=${encodeURIComponent(url)}`}
                  download={`${drugName}_PI.pdf`}
                  className="p-2 flex items-center gap-2 rounded-lg bg-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] transition-colors text-sm font-medium"
                  title="Download PDF"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-brand-navy)] transition-colors"
                  title="Open Original Link"
                >
                  <ExternalLink size={20} />
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-brand-navy)] transition-colors"
                  title="Close PDF"
                >
                  <X size={24} />
                </button>
              </div>
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
                src={`/api/pdf?url=${encodeURIComponent(url)}`}
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${isPdfLoading ? 'opacity-0' : 'opacity-100'}`}
                title={`${drugName} Prescribing Information`}
                onLoad={() => setIsPdfLoading(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
