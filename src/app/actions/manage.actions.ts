'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Generalized Action wrapper for Error Handling
async function handleAction(action: () => Promise<any>) {
  try {
    return await action();
  } catch (error: any) {
    console.error('Action Failed:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
}

function revalidateAll() {
  revalidatePath('/', 'layout');
}

// ---------------------------
// COMPANIES
// ---------------------------
export async function createCompany(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('companies').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateCompany(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('companies').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteCompany(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

// ---------------------------
// DRUGS
// ---------------------------
export async function createDrug(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drugs').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateDrug(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drugs').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteDrug(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drugs').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

// ---------------------------
// INDICATIONS
// ---------------------------
export async function createIndication(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_indications').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateIndication(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_indications').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteIndication(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_indications').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

// ---------------------------
// TRIALS
// ---------------------------
export async function createTrial(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('clinical_trials').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateTrial(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('clinical_trials').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteTrial(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('clinical_trials').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

// ---------------------------
// EVENTS
// ---------------------------
export async function createEvent(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('upcoming_events').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateEvent(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('upcoming_events').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteEvent(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('upcoming_events').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

// ---------------------------
// UPDATES
// ---------------------------
export async function createUpdate(data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_updates').insert([data]);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function updateUpdate(id: number, data: any) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_updates').update(data).eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}

export async function deleteUpdate(id: number) {
  return handleAction(async () => {
    const supabase = await createClient();
    const { error } = await supabase.from('drug_updates').delete().eq('id', id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return { success: true };
  });
}
