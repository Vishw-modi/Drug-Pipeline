import React from 'react';
import { getIndications } from '@/services/indication.service';
import { getDrugs } from '@/services/drugs.service';
import { ManageIndicationsClient } from './ManageIndicationsClient';

export default async function ManageIndicationsPage() {
  const [indications, drugs] = await Promise.all([
    getIndications(),
    getDrugs()
  ]);
  
  return <ManageIndicationsClient initialData={indications} drugs={drugs} />;
}
