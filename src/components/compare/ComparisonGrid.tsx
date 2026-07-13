import React from 'react';
import { Drug } from '@/types/drug';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ComparisonGridProps {
  drugs: Drug[];
}

export function ComparisonGrid({ drugs }: ComparisonGridProps) {
  if (!drugs || drugs.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12 text-center shadow-sm">
        <h3 className="text-lg font-medium text-brand-navy mb-2">No Drugs Selected</h3>
        <p className="text-muted">Select drugs from the search bar above to begin comparing them side-by-side.</p>
      </div>
    );
  }

  const renderBoolean = (val: boolean | null | undefined) => (
    val 
      ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> 
      : <XCircle size={18} className="text-slate-300 mx-auto" />
  );

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-brand-navy w-48 min-w-[12rem] border-r border-border bg-slate-50 sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">
                Attribute
              </th>
              {drugs.map(drug => (
                <th key={drug.id} className="px-6 py-4 font-bold text-brand-primary min-w-[16rem] border-r border-border last:border-r-0 align-top">
                  <div className="text-lg mb-1">{drug.drug_name}</div>
                  <div className="text-xs font-normal text-muted">{drug.company?.company_name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Generic Name</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0">{drug.generic_name || '-'}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Development Phase</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20`}>
                    {drug.development_phase}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Molecule Type</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0">{drug.molecule_type}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Target</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0 font-medium">{drug.target}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Mechanism of Action</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0 text-xs leading-relaxed">{drug.mechanism_of_action}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Approval Status</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-slate-700 border-r border-border last:border-r-0">{drug.approval_status}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50 bg-slate-50/30">
              <td className="px-6 py-3 font-semibold text-brand-navy border-r border-border sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] uppercase text-xs tracking-wider" colSpan={drugs.length + 1}>
                Designations
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">First in Class</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-center border-r border-border last:border-r-0">{renderBoolean(drug.first_in_class)}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Orphan Designation</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-center border-r border-border last:border-r-0">{renderBoolean(drug.orphan_designation)}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Fast Track</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-center border-r border-border last:border-r-0">{renderBoolean(drug.fast_track)}</td>
              ))}
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-brand-navy border-r border-border bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0]">Breakthrough</td>
              {drugs.map(drug => (
                <td key={drug.id} className="px-6 py-4 text-center border-r border-border last:border-r-0">{renderBoolean(drug.breakthrough_designation)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
