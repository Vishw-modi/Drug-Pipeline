import React from 'react';
import { getDrugs } from '@/services/drugs.service';
import { getCompanies } from '@/services/companies.service';
import { ManageDrugsClient } from './ManageDrugsClient';

export default async function ManageDrugsPage() {
  const [drugs, companies] = await Promise.all([
    getDrugs(),
    getCompanies()
  ]);
  
  return <ManageDrugsClient initialData={drugs} companies={companies} />;
}
