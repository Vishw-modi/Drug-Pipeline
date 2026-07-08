'use client';

import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { ExportDropdown } from '../dashboard/ExportDropdown';
import { ExportPreviewModal } from '../dashboard/ExportPreviewModal';
import { generatePreview, downloadImage, downloadPowerPoint, getExportFilename } from '@/services/export.service';

export function Topbar() {
  const [isExporting, setIsExporting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'image' | 'ppt'>('image');
  const [loadingMessage, setLoadingMessage] = useState('Preparing Export...');

  const handleExport = async (format: 'image' | 'ppt') => {
    setExportFormat(format);
    setModalOpen(true);
    setIsExporting(true);
    setLoadingMessage('Rendering Dashboard...');
    
    try {
      // Small delay to allow modal to open and layout to settle
      await new Promise(r => setTimeout(r, 100));
      
      setLoadingMessage('Generating Preview...');
      const dataUrl = await generatePreview('export-container');
      
      setPreviewUrl(dataUrl);
    } catch (err) {
      console.error('Export failed', err);
      // In a real app we'd show a toast here
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmDownload = () => {
    if (!previewUrl) return;
    
    const ext = exportFormat === 'image' ? '.png' : '.pptx';
    const filename = getExportFilename(ext);
    
    if (exportFormat === 'image') {
      downloadImage(previewUrl, filename);
    } else {
      downloadPowerPoint(previewUrl, filename);
    }
    
    setModalOpen(false);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-[var(--color-border)] flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search across drugs, companies, targets..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:bg-white transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-4 text-slate-500">
          <div className="text-xs text-slate-400 hidden md:block mr-2" suppressHydrationWarning>
            Last Updated: {new Date().toLocaleDateString()}
          </div>
          
          <ExportDropdown onExport={handleExport} />
          
          <div className="h-8 w-8 bg-[var(--color-brand-primary)] text-white rounded-full flex items-center justify-center ml-2 cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </header>

      <ExportPreviewModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDownload}
        previewUrl={previewUrl}
        isLoading={isExporting}
        loadingMessage={loadingMessage}
        formatName={exportFormat === 'image' ? 'Image (PNG)' : 'PowerPoint (PPTX)'}
        filename={getExportFilename(exportFormat === 'image' ? '.png' : '.pptx')}
      />
    </>
  );
}
