'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Drug } from '@/types/drug';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { DrugUpdateForm } from '@/components/manage/forms/DrugUpdateForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteUpdate } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ManageUpdatesClientProps {
  initialData: any[];
  drugs: Drug[];
}

export function ManageUpdatesClient({ initialData, drugs }: ManageUpdatesClientProps) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [slideOverMode, setSlideOverMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<any | null>(null);

  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setSlideOverMode('create');
    setIsSlideOverOpen(true);
  };

  const handleOpenView = (record: any) => {
    setSelectedRecord(record);
    setSlideOverMode('view');
    setIsSlideOverOpen(true);
  };

  const handleOpenEdit = (record: any) => {
    setSelectedRecord(record);
    setSlideOverMode('edit');
    setIsSlideOverOpen(true);
  };

  const handleOpenDelete = (record: any) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteUpdate(recordToDelete.id);
      if (result.success) {
        setIsDeleteModalOpen(false);
      } else {
        alert(result.error);
      }
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: 'update_title',
      header: 'Title',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline truncate block max-w-sm"
          onClick={() => handleOpenView(row.original)}
          title={row.original.update_title}
        >
          {row.original.update_title}
        </span>
      ),
    },
    {
      id: 'drug',
      header: 'Drug',
      accessorFn: (row) => drugs.find(d => d.id === row.drug_id)?.drug_name || 'Unknown',
    },
    {
      accessorKey: 'update_type',
      header: 'Type',
    },
    {
      accessorKey: 'update_date',
      header: 'Date',
      cell: ({ row }) => row.original.update_date ? format(parseISO(row.original.update_date), 'MMM dd, yyyy') : 'N/A'
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => {
        if (!row.original.source) return 'N/A';
        if (row.original.source_url) {
          return (
            <a href={row.original.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {row.original.source}
            </a>
          );
        }
        return row.original.source;
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button onClick={() => handleOpenView(row.original)} className="text-slate-400 hover:text-slate-700" title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={() => handleOpenEdit(row.original)} className="text-slate-400 hover:text-blue-600" title="Edit">
            <Edit2 className="h-4 w-4" />
          </button>
          <button onClick={() => handleOpenDelete(row.original)} className="text-slate-400 hover:text-red-600" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    }
  ];

  const titleMap = {
    create: 'Add New Update',
    edit: 'Edit Update',
    view: 'Update Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Drug Updates"
        description="Manage the news feed and latest updates for pipeline assets."
        columns={columns}
        data={initialData} 
        onAdd={handleOpenCreate}
        searchPlaceholder="Search updates..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
      >
        <DrugUpdateForm 
          mode={slideOverMode}
          initialData={selectedRecord}
          drugs={drugs}
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOverPanel>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityName={recordToDelete?.update_title || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
