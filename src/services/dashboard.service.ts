import { createClient as createServerClient } from '@/lib/supabase/server';
import { DashboardSummary, ChartDataCount } from '@/types/dashboard';
import { UpcomingEvent, DrugUpdate } from '@/types/event';

const buildDrugQuery = (supabase: any, filters?: Record<string, string>) => {
  let selectStr = '*, companies!inner(company_name), drug_indications!inner(therapeutic_area, indication, cancer_type)';
  let query = supabase.from('drugs').select(selectStr);

  if (filters) {
    if (filters.developmentPhase) query = query.eq('development_phase', filters.developmentPhase);
    if (filters.moleculeType) query = query.eq('molecule_type', filters.moleculeType);
    if (filters.sponsor) query = query.eq('companies.company_name', filters.sponsor);
    if (filters.therapeuticArea) query = query.eq('drug_indications.therapeutic_area', filters.therapeuticArea);
    if (filters.indication) query = query.eq('drug_indications.indication', filters.indication);
    if (filters.cancerType) query = query.eq('drug_indications.cancer_type', filters.cancerType);
  }
  return query;
};

// Deduplicate rows since inner joining drug_indications might return multiple rows per drug
const deduplicateDrugs = (data: any[]) => {
  const seen = new Set();
  return data.filter(d => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
};

export async function getDashboardSummary(filters?: Record<string, string>): Promise<DashboardSummary> {
  const supabase = await createServerClient();
  const query = buildDrugQuery(supabase, filters);
  const { data: rawDrugs, error } = await query;
  
  if (error || !rawDrugs) {
    return { total_pipeline_drugs: 0, early_stage: 0, mid_stage: 0, late_stage: 0, approved: 0 };
  }

  const drugs = deduplicateDrugs(rawDrugs);

  let early = 0, mid = 0, late = 0, approved = 0;
  drugs.forEach(d => {
    const phase = d.development_phase;
    if (['Discovery', 'Preclinical', 'Phase I'].includes(phase)) early++;
    else if (phase === 'Phase II') mid++;
    else if (['Phase III', 'Filed'].includes(phase)) late++;
    if (d.approval_status === 'Approved' || phase === 'Approved') approved++;
  });

  return { total_pipeline_drugs: drugs.length, early_stage: early, mid_stage: mid, late_stage: late, approved };
}

export async function getPipelineByPhase(filters?: Record<string, string>): Promise<ChartDataCount[]> {
  const supabase = await createServerClient();
  const { data: rawDrugs } = await buildDrugQuery(supabase, filters);
  if (!rawDrugs) return [];

  const drugs = deduplicateDrugs(rawDrugs);
  const counts: Record<string, number> = {};
  drugs.forEach(d => {
    const phase = d.development_phase || 'Unknown';
    counts[phase] = (counts[phase] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
}

export async function getPipelineByCancerType(filters?: Record<string, string>): Promise<ChartDataCount[]> {
  const supabase = await createServerClient();
  const { data: rawDrugs } = await buildDrugQuery(supabase, filters);
  if (!rawDrugs) return [];

  // Don't deduplicate here, we want to count cancer types. If a drug has multiple cancer types, we count each one once per drug.
  const counts: Record<string, number> = {};
  const seenDrugCancer = new Set();

  rawDrugs.forEach((d: any) => {
    const cancerTypes = Array.isArray(d.drug_indications) ? d.drug_indications : [d.drug_indications];
    cancerTypes.forEach((ind: any) => {
      if (!ind || !ind.cancer_type) return;
      const key = `${d.id}-${ind.cancer_type}`;
      if (!seenDrugCancer.has(key)) {
        seenDrugCancer.add(key);
        counts[ind.cancer_type] = (counts[ind.cancer_type] || 0) + 1;
      }
    });
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 10);
}

export async function getPipelineByMoleculeType(filters?: Record<string, string>): Promise<ChartDataCount[]> {
  const supabase = await createServerClient();
  const { data: rawDrugs } = await buildDrugQuery(supabase, filters);
  if (!rawDrugs) return [];

  const drugs = deduplicateDrugs(rawDrugs);
  const counts: Record<string, number> = {};
  drugs.forEach(d => {
    const type = d.molecule_type || 'Unknown';
    counts[type] = (counts[type] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
}

export async function getPipelineBySponsor(filters?: Record<string, string>): Promise<ChartDataCount[]> {
  const supabase = await createServerClient();
  const { data: rawDrugs } = await buildDrugQuery(supabase, filters);
  if (!rawDrugs) return [];

  const drugs = deduplicateDrugs(rawDrugs);
  const counts: Record<string, number> = {};
  drugs.forEach((d: any) => {
    const sponsor = d.companies?.company_name || 'Unknown';
    counts[sponsor] = (counts[sponsor] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0,10);
}

export async function getUpcomingCatalysts(filters?: Record<string, string>): Promise<UpcomingEvent[]> {
  // To filter catalysts, we need to apply filters on the related drug
  const supabase = await createServerClient();
  const { data: validDrugs } = await buildDrugQuery(supabase, filters);
  const validDrugIds = validDrugs ? Array.from(new Set(validDrugs.map(d => d.id))) : [];

  let query = supabase.from('upcoming_events')
    .select('*, drugs(drug_name, companies(company_name))')
    .order('expected_date', { ascending: true })
    .limit(10);

  if (filters && Object.keys(filters).length > 0 && validDrugIds.length > 0) {
    query = query.in('drug_id', validDrugIds);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  
  return data.map((item: any) => ({
    ...item,
    drug_name: item.drugs?.drug_name,
    company_name: item.drugs?.companies?.company_name
  }));
}

export async function getRecentUpdates(filters?: Record<string, string>): Promise<DrugUpdate[]> {
  const supabase = await createServerClient();
  const { data: validDrugs } = await buildDrugQuery(supabase, filters);
  const validDrugIds = validDrugs ? Array.from(new Set(validDrugs.map(d => d.id))) : [];

  let query = supabase.from('drug_updates')
    .select('*, drugs(drug_name)')
    .order('update_date', { ascending: false })
    .limit(10);

  if (filters && Object.keys(filters).length > 0 && validDrugIds.length > 0) {
    query = query.in('drug_id', validDrugIds);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  
  return data.map((item: any) => ({
    ...item,
    drug_name: item.drugs?.drug_name
  }));
}
