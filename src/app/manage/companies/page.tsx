import React from 'react';
import { getCompanies } from '@/services/companies.service';
import { ManageCompaniesClient } from './ManageCompaniesClient';

export default async function ManageCompaniesPage() {
  const companies = await getCompanies();
  return <ManageCompaniesClient initialData={companies} />;
}
