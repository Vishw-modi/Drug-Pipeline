import { createClient } from '@/lib/supabase/server';
import { Company } from '@/types/company';

export interface CompanyWithStats extends Company {
  total_drugs: number;
}

export async function getCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('companies').select('*').order('company_name');
  if (error || !data) return [];
  return data;
}

export async function getCompaniesWithStats(): Promise<CompanyWithStats[]> {
  const supabase = await createClient();
  // Fetch companies and just the IDs of their drugs to minimize payload
  const { data, error } = await supabase
    .from('companies')
    .select('*, drugs(id)')
    .order('company_name');
    
  if (error || !data) return [];
  
  return data.map(company => ({
    ...company,
    total_drugs: company.drugs ? company.drugs.length : 0
  }));
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('companies').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}

export async function getCompanyDeepDive(id: string) {
  const supabase = await createClient();
  
  // Fetch the company and its complete drug portfolio including indications
  const { data, error } = await supabase
    .from('companies')
    .select(`
      *,
      drugs(
        *,
        drug_indications(
          *
        )
      )
    `)
    .eq('id', id)
    .single();
    
  if (error || !data) return null;
  return data;
}
