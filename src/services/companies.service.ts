import { createClient } from '@/lib/supabase/server';
import { Company } from '@/types/company';

export async function getCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('companies').select('*').order('company_name');
  if (error || !data) return [];
  return data;
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('companies').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}
