'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DrugIndication, Drug } from '@/types/drug';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { DrugIndicationForm } from '@/components/manage/forms/DrugIndicationForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteIndication } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ManageIndicationsClientProps {
  initialData: DrugIndication[];
  drugs: Drug[];
}

export function ManageIndicationsClient({ initialData, drugs }: ManageIndicationsClientProps) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [slideOverMode, setSlideOverMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<DrugIndication | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<DrugIndication | null>(null);

  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setSlideOverMode('create');
    setIsSlideOverOpen(true);
  };

  const handleOpenView = (record: DrugIndication) => {
    setSelectedRecord(record);
    setSlideOverMode('view');
    setIsSlideOverOpen(true);
  };

  const handleOpenEdit = (record: DrugIndication) => {
    setSelectedRecord(record);
    setSlideOverMode('edit');
    setIsSlideOverOpen(true);
  };

  const handleOpenDelete = (record: DrugIndication) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteIndication(recordToDelete.id);
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

  const columns: ColumnDef<DrugIndication, any>[] = [
    {
      accessorKey: 'indication',
      header: 'Indication',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline"
          onClick={() => handleOpenView(row.original)}
        >
          {row.original.indication}
        </span>
      ),
    },
    {
      id: 'drug',
      header: 'Drug',
      accessorFn: (row) => drugs.find(d => d.id === row.drug_id)?.drug_name || 'Unknown',
    },
    {
      accessorKey: 'cancer_type',
      header: 'Cancer Type',
    },
    {
      accessorKey: 'development_phase',
      header: 'Phase',
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
    create: 'Add New Indication',
    edit: 'Edit Indication',
    view: 'Indication Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Drug Indications"
        description="Manage therapeutic areas, cancer types and phases for drugs."
        columns={columns}
        data={initialData} 
        onAdd={handleOpenCreate}
        searchPlaceholder="Search indications..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
      >
        <DrugIndicationForm 
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
        entityName={recordToDelete?.indication || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
