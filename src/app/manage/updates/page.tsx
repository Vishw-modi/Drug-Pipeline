import React from 'react';
import { getUpdates } from '@/services/update.service';
import { getDrugs } from '@/services/drugs.service';
import { ManageUpdatesClient } from './ManageUpdatesClient';

export default async function ManageUpdatesPage() {
  const [updates, drugs] = await Promise.all([
    getUpdates(),
    getDrugs()
  ]);
  
  return <ManageUpdatesClient initialData={updates} drugs={drugs} />;
}
