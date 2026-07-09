import React from 'react';
import { getCompanies } from '@/services/companies.service';
import { AddDrugForm } from '@/components/admin/AddDrugForm';
import { Topbar } from '@/components/layout/Topbar';

export const metadata = {
  title: 'Add New Drug | Pharma Dashboard',
};

export default async function AddDrugPage() {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Topbar />
      
      <main className="flex-1 p-6 md:p-8 pt-24 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-1">Submit new clinical candidates to the public database.</p>
        </div>
        
        <AddDrugForm companies={companies} />
      </main>
    </div>
  );
}
