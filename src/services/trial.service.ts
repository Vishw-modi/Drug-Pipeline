import { createClient } from '@/lib/supabase/server';
import { Drug } from '@/types/drug';

export async function getTrials(): Promise<any[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('clinical_trials').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}

export async function getPipelineWithTrials(): Promise<any[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('drugs')
    .select('*, companies!inner(company_name), drug_indications(cancer_type), clinical_trials(id, status)');

  if (error || !data) {
    console.error('Error fetching pipeline with trials:', error);
    return [];
  }

  // Deduplicate and map
  const seen = new Set();
  const deduplicated = data.filter(d => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });

  return deduplicated.map((d: any) => ({
    ...d,
    company: d.companies?.company_name || 'Unknown',
    cancer_type: d.drug_indications && d.drug_indications.length > 0 
      ? d.drug_indications[0].cancer_type 
      : 'N/A',
    trial_count: d.clinical_trials?.length || 0,
    active_trials: d.clinical_trials?.filter((t: any) => 
      t.status === 'Recruiting' || t.status === 'Active, Not Recruiting' || t.status === 'Enrolling by Invitation'
    ).length || 0
  }));
}
