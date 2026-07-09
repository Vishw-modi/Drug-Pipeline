'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Company } from '@/types/company';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { CompanyForm } from '@/components/manage/forms/CompanyForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteCompany } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ManageCompaniesClientProps {
  initialData: Company[];
}

export function ManageCompaniesClient({ initialData }: ManageCompaniesClientProps) {
  const [data, setData] = useState<Company[]>(initialData);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [slideOverMode, setSlideOverMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<Company | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Company | null>(null);

  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setSlideOverMode('create');
    setIsSlideOverOpen(true);
  };

  const handleOpenView = (record: Company) => {
    setSelectedRecord(record);
    setSlideOverMode('view');
    setIsSlideOverOpen(true);
  };

  const handleOpenEdit = (record: Company) => {
    setSelectedRecord(record);
    setSlideOverMode('edit');
    setIsSlideOverOpen(true);
  };

  const handleOpenDelete = (record: Company) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteCompany(recordToDelete.id);
      if (result.success) {
        // Optimistic UI update or rely on revalidation. Revalidation will fetch new data on next render.
        // For smooth UX, we close immediately.
        setIsDeleteModalOpen(false);
      } else {
        alert(result.error);
      }
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsSlideOverOpen(false);
  };

  const columns: ColumnDef<Company, any>[] = [
    {
      accessorKey: 'company_name',
      header: 'Company Name',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline"
          onClick={() => handleOpenView(row.original)}
        >
          {row.original.company_name}
        </span>
      ),
    },
    {
      accessorKey: 'company_type',
      header: 'Type',
    },
    {
      accessorKey: 'headquarters',
      header: 'Headquarters',
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
    create: 'Add New Company',
    edit: 'Edit Company',
    view: 'Company Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Companies"
        description="Manage all pharmaceutical companies and sponsors in the pipeline."
        columns={columns}
        data={initialData} // We pass the server-fetched data which will update on revalidate
        onAdd={handleOpenCreate}
        searchPlaceholder="Search companies..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
        isDirty={false} // Would be wired up to form state in a real app
      >
        <CompanyForm 
          mode={slideOverMode}
          initialData={selectedRecord}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOverPanel>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityName={recordToDelete?.company_name || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
