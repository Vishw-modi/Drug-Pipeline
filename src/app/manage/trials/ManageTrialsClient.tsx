'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Drug } from '@/types/drug';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { ClinicalTrialForm } from '@/components/manage/forms/ClinicalTrialForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteTrial } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ManageTrialsClientProps {
  initialData: any[];
  drugs: Drug[];
}

export function ManageTrialsClient({ initialData, drugs }: ManageTrialsClientProps) {
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
      const result = await deleteTrial(recordToDelete.id);
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
      accessorKey: 'nct_id',
      header: 'NCT ID',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline"
          onClick={() => handleOpenView(row.original)}
        >
          {row.original.nct_id || 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'trial_name',
      header: 'Trial Name',
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.original.trial_name}>
          {row.original.trial_name}
        </div>
      ),
    },
    {
      id: 'drug',
      header: 'Drug',
      accessorFn: (row) => drugs.find(d => d.id === row.drug_id)?.drug_name || 'Unknown',
    },
    {
      accessorKey: 'phase',
      header: 'Phase',
    },
    {
      accessorKey: 'status',
      header: 'Status',
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
    create: 'Add New Trial',
    edit: 'Edit Trial',
    view: 'Trial Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Clinical Trials"
        description="Manage clinical trials, status, and enrollment for pipeline assets."
        columns={columns}
        data={initialData} 
        onAdd={handleOpenCreate}
        searchPlaceholder="Search trials (NCT, name, status)..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
      >
        <ClinicalTrialForm 
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
        entityName={recordToDelete?.nct_id || recordToDelete?.trial_name || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
