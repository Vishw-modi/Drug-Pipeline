'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Drug } from '@/types/drug';
import { UpcomingEvent } from '@/types/event';
import { ManagementTable } from '@/components/manage/tables/ManagementTable';
import { SlideOverPanel } from '@/components/manage/drawers/SlideOverPanel';
import { UpcomingEventForm } from '@/components/manage/forms/UpcomingEventForm';
import { DeleteConfirmationModal } from '@/components/manage/dialogs/DeleteConfirmationModal';
import { deleteEvent } from '@/app/actions/manage.actions';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ManageEventsClientProps {
  initialData: UpcomingEvent[];
  drugs: Drug[];
  trials: any[];
}

export function ManageEventsClient({ initialData, drugs, trials }: ManageEventsClientProps) {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [slideOverMode, setSlideOverMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedRecord, setSelectedRecord] = useState<UpcomingEvent | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<UpcomingEvent | null>(null);

  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setSlideOverMode('create');
    setIsSlideOverOpen(true);
  };

  const handleOpenView = (record: UpcomingEvent) => {
    setSelectedRecord(record);
    setSlideOverMode('view');
    setIsSlideOverOpen(true);
  };

  const handleOpenEdit = (record: UpcomingEvent) => {
    setSelectedRecord(record);
    setSlideOverMode('edit');
    setIsSlideOverOpen(true);
  };

  const handleOpenDelete = (record: UpcomingEvent) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;
    setIsDeleting(true);
    try {
      const result = await deleteEvent(recordToDelete.id);
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

  const columns: ColumnDef<UpcomingEvent, any>[] = [
    {
      accessorKey: 'event_name',
      header: 'Event',
      cell: ({ row }) => (
        <span 
          className="font-medium text-[var(--color-brand-primary)] cursor-pointer hover:underline"
          onClick={() => handleOpenView(row.original)}
        >
          {row.original.event_name}
        </span>
      ),
    },
    {
      id: 'drug',
      header: 'Drug',
      accessorFn: (row) => drugs.find(d => d.id === row.drug_id)?.drug_name || 'Unknown',
    },
    {
      accessorKey: 'event_type',
      header: 'Type',
    },
    {
      accessorKey: 'expected_date',
      header: 'Expected Date',
      cell: ({ row }) => row.original.expected_date ? format(parseISO(row.original.expected_date), 'MMM yyyy') : 'N/A'
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
    create: 'Add New Event',
    edit: 'Edit Event',
    view: 'Event Details',
  };

  return (
    <div className="h-full p-6">
      <ManagementTable
        title="Upcoming Events"
        description="Manage catalysts, milestones and regulatory events."
        columns={columns}
        data={initialData} 
        onAdd={handleOpenCreate}
        searchPlaceholder="Search events..."
      />

      <SlideOverPanel
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title={titleMap[slideOverMode]}
      >
        <UpcomingEventForm 
          mode={slideOverMode}
          initialData={selectedRecord}
          drugs={drugs}
          trials={trials}
          onSuccess={() => setIsSlideOverOpen(false)}
          onCancel={() => setIsSlideOverOpen(false)}
        />
      </SlideOverPanel>

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityName={recordToDelete?.event_name || 'this record'}
        isDeleting={isDeleting}
      />
    </div>
  );
}
