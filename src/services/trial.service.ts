import { createClient } from '@/lib/supabase/server';

export async function getTrials(): Promise<any[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('clinical_trials').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}
