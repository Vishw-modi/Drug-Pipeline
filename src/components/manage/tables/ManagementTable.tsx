'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { Plus, Download, Upload, Copy } from 'lucide-react';

interface ManagementTableProps<TData, TValue> {
  title: string;
  description?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAdd: () => void;
  searchPlaceholder?: string;
}

export function ManagementTable<TData, TValue>({
  title,
  description,
  columns,
  data,
  onAdd,
  searchPlaceholder = 'Search records...',
}: ManagementTableProps<TData, TValue>) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {/* Placeholders for Import/Export architecture */}
          <button className="hidden sm:inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 opacity-50 cursor-not-allowed" title="Coming Soon">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="hidden sm:inline-flex items-center px-3 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 opacity-50 cursor-not-allowed" title="Coming Soon">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[var(--color-brand-primary)] hover:bg-[#128a88] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-primary)]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* We reuse the DataTable component which handles Search, Pagination, Sorting */}
        <DataTable 
          columns={columns}
          data={data}
          searchPlaceholder={searchPlaceholder}
        />
      </div>
    </div>
  );
}
