import { createClient } from '@/lib/supabase/server';
import { DrugIndication } from '@/types/drug';

export async function getIndications(): Promise<DrugIndication[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('drug_indications').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}
