import React from 'react';
import { getEvents } from '@/services/event.service';
import { getDrugs } from '@/services/drugs.service';
import { getTrials } from '@/services/trial.service';
import { ManageEventsClient } from './ManageEventsClient';

export default async function ManageEventsPage() {
  const [events, drugs, trials] = await Promise.all([
    getEvents(),
    getDrugs(),
    getTrials()
  ]);
  
  return <ManageEventsClient initialData={events} drugs={drugs} trials={trials} />;
}
