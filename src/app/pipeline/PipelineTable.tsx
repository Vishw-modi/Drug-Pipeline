'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Drug } from '@/types/drug';
import Link from 'next/link';

const columns: ColumnDef<Drug>[] = [
  {
    accessorKey: 'drug_name',
    header: 'Drug Name',
    cell: ({ row }) => (
      <Link href={`/drugs/${row.original.id}`} className="font-medium text-[var(--color-brand-primary)] hover:underline">
        {row.original.drug_name}
      </Link>
    ),
  },
  {
    accessorKey: 'company.company_name',
    header: 'Company',
    cell: ({ row }) => {
      const name = row.original.company?.company_name;
      return <span className="text-slate-600">{name || 'Unknown'}</span>;
    },
  },
  {
    accessorKey: 'target',
    header: 'Target',
  },
  {
    accessorKey: 'molecule_type',
    header: 'Molecule Type',
  },
  {
    accessorKey: 'development_phase',
    header: 'Phase',
    cell: ({ row }) => <StatusBadge status={row.original.development_phase} />,
  },
];

export function PipelineTable({ data }: { data: Drug[] }) {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchPlaceholder="Search drugs, companies, targets..." 
    />
  );
}
