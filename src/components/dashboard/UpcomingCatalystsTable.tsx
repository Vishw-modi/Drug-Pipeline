'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'drug_name',
    header: 'Drug / Candidate',
    cell: ({ row }) => (
      <Link href={`/drugs/${row.original.drug_id}`} className="font-medium text-[var(--color-brand-primary)] hover:underline">
        {row.original.drug_name}
      </Link>
    ),
  },
  {
    accessorKey: 'indication',
    header: 'Indication',
  },
  {
    accessorKey: 'phase',
    header: 'Phase',
    cell: ({ row }) => <StatusBadge status={row.original.phase} />,
  },
  {
    accessorKey: 'event_type',
    header: 'Catalyst Type',
  },
  {
    accessorKey: 'expected_date',
    header: 'Expected Date',
    cell: ({ row }) => <span className="text-sm font-medium">{formatDate(row.original.expected_date)}</span>,
  }
];

export function UpcomingCatalystsTable({ data, preview = true }: { data: any[], preview?: boolean }) {
  const displayData = preview ? data.slice(0, 5) : data;
  
  return (
    <div className="text-sm">
      <DataTable 
        columns={columns} 
        data={displayData} 
      />
    </div>
  );
}
