'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Drug } from '@/types/drug';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const sampleColumns: ColumnDef<Drug>[] = [
  {
    accessorKey: 'drug_name',
    header: 'Drug / Candidate',
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
    accessorKey: 'molecule_type',
    header: 'Molecule Type',
  },
  {
    accessorKey: 'target',
    header: 'Target',
  },
  {
    accessorKey: 'development_phase',
    header: 'Phase',
    cell: ({ row }) => <StatusBadge status={row.original.development_phase} />,
  },
  {
    accessorKey: 'first_in_class',
    header: 'First In Class',
    cell: ({ row }) => row.original.first_in_class ? (
      <CheckCircle size={16} className="text-emerald-500 mx-auto" />
    ) : (
      <span className="text-slate-400 mx-auto block text-center">-</span>
    ),
  }
];

export function SamplePipelineTable({ data }: { data: Drug[] }) {
  return (
    <DataTable 
      columns={sampleColumns} 
      data={data} 
      searchPlaceholder="Search preview..." 
    />
  );
}
