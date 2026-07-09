import React from 'react';
import { getTrials } from '@/services/trial.service';
import { getDrugs } from '@/services/drugs.service';
import { ManageTrialsClient } from './ManageTrialsClient';

export default async function ManageTrialsPage() {
  const [trials, drugs] = await Promise.all([
    getTrials(),
    getDrugs()
  ]);
  
  return <ManageTrialsClient initialData={trials} drugs={drugs} />;
}
