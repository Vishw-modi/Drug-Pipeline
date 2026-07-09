import { createClient } from '@/lib/supabase/server';

export async function getUpdates(): Promise<any[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('drug_updates').select('*').order('update_date', { ascending: false });
  if (error || !data) return [];
  return data;
}
