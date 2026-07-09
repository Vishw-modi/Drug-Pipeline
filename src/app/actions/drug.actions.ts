'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addDrug(formData: FormData) {
  const supabase = await createClient();
  
  const company_id = formData.get('company_id') as string;
  const drug_name = formData.get('drug_name') as string;
  const generic_name = formData.get('generic_name') as string;
  const molecule_type = formData.get('molecule_type') as string;
  const target = formData.get('target') as string;
  const development_phase = formData.get('development_phase') as string;
  const description = formData.get('description') as string;

  if (!company_id || !drug_name) {
    return { error: 'Company and Drug Name are required fields.' };
  }

  const { data, error } = await supabase.from('drugs').insert([
    {
      company_id: parseInt(company_id),
      drug_name,
      generic_name: generic_name || null,
      molecule_type: molecule_type || null,
      target: target || null,
      development_phase: development_phase || null,
      description: description || null,
      // Since it's user submitted, we default to investigational
      approval_status: development_phase === 'Approved' ? 'Approved' : 'Investigational'
    }
  ]);

  if (error) {
    console.error('Error inserting drug:', error);
    return { error: error.message };
  }

  revalidatePath('/'); // Revalidate the dashboard
  revalidatePath('/admin/add-drug');

  return { success: true };
}
