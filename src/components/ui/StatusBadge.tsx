import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string | null | undefined;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-500">Unknown</span>;

  let bgClass = "bg-slate-100";
  let textClass = "text-slate-600";

  switch (status) {
    case 'Discovery':
      bgClass = "bg-gray-100"; textClass = "text-gray-600"; break;
    case 'Preclinical':
      bgClass = "bg-slate-100"; textClass = "text-slate-600"; break;
    case 'Phase I':
      bgClass = "bg-blue-100"; textClass = "text-blue-700"; break;
    case 'Phase II':
      bgClass = "bg-teal-100"; textClass = "text-teal-700"; break;
    case 'Phase III':
      bgClass = "bg-pink-100"; textClass = "text-pink-700"; break;
    case 'Filed':
      bgClass = "bg-orange-100"; textClass = "text-orange-700"; break;
    case 'Approved':
      bgClass = "bg-green-100"; textClass = "text-green-700"; break;
    case 'Withdrawn':
      bgClass = "bg-red-100"; textClass = "text-red-700"; break;
    default:
      bgClass = "bg-slate-100"; textClass = "text-slate-600"; break;
  }

  return (
    <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap", bgClass, textClass)}>
      {status}
    </span>
  );
}
