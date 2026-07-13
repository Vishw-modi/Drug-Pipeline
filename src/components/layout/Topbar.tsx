'use client';

import React, { useState, useTransition } from 'react';
import { Search, RefreshCw, Loader2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { ExportDropdown } from '../dashboard/ExportDropdown';
import { ExportPreviewModal } from '../dashboard/ExportPreviewModal';
import { generatePreview, downloadImage, downloadPowerPoint, getExportFilename } from '@/services/export.service';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useDashboardFilter } from '@/context/DashboardFilterContext';

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { resetFilters } = useDashboardFilter();
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'image' | 'ppt'>('image');
  const [loadingMessage, setLoadingMessage] = useState('Preparing Export...');

  const handleRefresh = () => {
    startTransition(() => {
      resetFilters();
      router.refresh();
    });
  };

  const handleExport = async (format: 'image' | 'ppt') => {
    setExportFormat(format);
    setModalOpen(true);
    setIsExporting(true);
    setLoadingMessage('Rendering Dashboard...');
    
    try {
      await new Promise(r => setTimeout(r, 100));
      setLoadingMessage('Generating Preview...');
      const dataUrl = await generatePreview('export-container');
      setPreviewUrl(dataUrl);
    } catch (err) {
      console.error('Export failed', err);
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
      {isPending && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[999] flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-brand-primary mb-4" size={48} />
          <h2 className="text-xl font-semibold text-brand-navy">Refreshing Dashboard...</h2>
          <p className="text-muted mt-2">Fetching latest data from the server</p>
        </div>
      )}
      <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center text-sm font-medium text-muted">
            <span className="hidden sm:inline">KMK Pipeline</span>
            <span className="mx-2 hidden sm:inline">/</span>
            <span className="text-brand-navy">
              {pathname === '/' ? 'Oncology Overview' : 
               pathname === '/pipeline' ? 'Pipeline Explorer' :
               pathname === '/compare' ? 'Comparative Analysis' :
               pathname === '/trials' ? 'Market Insights' :
               pathname === '/catalysts' ? 'Upcoming Catalysts' :
               pathname === '/reports' ? 'Reports' :
               pathname === '/settings' ? 'Settings' : 'Dashboard'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-4 text-slate-500">
          <div className="text-xs text-slate-400 hidden md:block mr-2" suppressHydrationWarning>
            Last Updated: {new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'short', timeStyle: 'short' })} EST
          </div>
          
          <ThemeSwitcher />
          <ExportDropdown onExport={handleExport} />
          
          <button 
            onClick={handleRefresh}
            disabled={isPending}
            title="Refresh the dashboard"
            className="h-8 w-8 bg-brand-primary text-white rounded-full flex items-center justify-center ml-2 cursor-pointer hover:bg-opacity-90 transition-all focus:outline-none disabled:opacity-50"
          >
            <RefreshCw size={16} className={isPending ? 'animate-spin' : ''} />
          </button>
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
