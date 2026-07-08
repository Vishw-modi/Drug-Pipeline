import { createClient } from '@/lib/supabase/server';
import { Drug } from '@/types/drug';

export async function getDrugs(filters?: Record<string, string>): Promise<Drug[]> {
  const supabase = await createClient();
  let query = supabase.from('drugs').select('*, companies!inner(company_name), drug_indications!inner(therapeutic_area, indication, cancer_type)');

  if (filters) {
    if (filters.developmentPhase) query = query.eq('development_phase', filters.developmentPhase);
    if (filters.moleculeType) query = query.eq('molecule_type', filters.moleculeType);
    if (filters.sponsor) query = query.eq('companies.company_name', filters.sponsor);
    if (filters.therapeuticArea) query = query.eq('drug_indications.therapeutic_area', filters.therapeuticArea);
    if (filters.indication) query = query.eq('drug_indications.indication', filters.indication);
    if (filters.cancerType) query = query.eq('drug_indications.cancer_type', filters.cancerType);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  
  // Deduplicate drugs by ID
  const seen = new Set();
  const deduplicated = data.filter(d => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });

  return deduplicated.map((d: any) => ({
    ...d,
    company: d.companies
  }));
}

export async function getDrugById(id: string): Promise<Drug | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('drugs')
    .select('*, companies(*)')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  
  return {
    ...data,
    company: data.companies
  };
}
