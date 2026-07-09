'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Drug } from '@/types/drug';
import { Company } from '@/types/company';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { DrugForm } from '@/components/manage/forms/DrugForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteDrug } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ManageDrugsClientProps {
  initialData: Drug[];
  companies: Company[];
}

export function ManageDrugsClient({ initialData, companies }: ManageDrugsClientProps) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [slideOverMode, setSlideOverMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<Drug | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Drug | null>(null);

  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setSlideOverMode('create');
    setIsSlideOverOpen(true);
  };

  const handleOpenView = (record: Drug) => {
    setSelectedRecord(record);
    setSlideOverMode('view');
    setIsSlideOverOpen(true);
  };

  const handleOpenEdit = (record: Drug) => {
    setSelectedRecord(record);
    setSlideOverMode('edit');
    setIsSlideOverOpen(true);
  };

  const handleOpenDelete = (record: Drug) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteDrug(recordToDelete.id);
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

  const columns: ColumnDef<Drug, any>[] = [
    {
      accessorKey: 'drug_name',
      header: 'Drug Name',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline"
          onClick={() => handleOpenView(row.original)}
        >
          {row.original.drug_name}
        </span>
      ),
    },
    {
      id: 'company',
      header: 'Company',
      accessorFn: (row) => companies.find(c => c.id === row.company_id)?.company_name || 'Unknown',
    },
    {
      accessorKey: 'development_phase',
      header: 'Phase',
    },
    {
      accessorKey: 'approval_status',
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
    create: 'Add New Drug',
    edit: 'Edit Drug',
    view: 'Drug Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Drugs"
        description="Manage the portfolio of drugs and their core attributes."
        columns={columns}
        data={initialData} 
        onAdd={handleOpenCreate}
        searchPlaceholder="Search drugs..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
      >
        <DrugForm 
          mode={slideOverMode}
          initialData={selectedRecord}
          companies={companies}
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOverPanel>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityName={recordToDelete?.drug_name || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
