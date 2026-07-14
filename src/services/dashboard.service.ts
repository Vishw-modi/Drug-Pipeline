import { createClient as createServerClient } from '@/lib/supabase/server';
import { DashboardSummary, ChartDataCount } from '@/types/dashboard';
import { UpcomingEvent, DrugUpdate } from '@/types/event';

const buildDrugQuery = (supabase: any, filters?: Record<string, string>, ignoreFilter?: string) => {
  let selectStr = '*, companies!inner(company_name), drug_indications!inner(therapeutic_area, indication, cancer_type)';
  let query = supabase.from('drugs').select(selectStr);

  if (filters) {
    if (filters.drug && ignoreFilter !== 'drug') query = query.eq('drug_name', filters.drug);
    if (filters.developmentPhase && ignoreFilter !== 'developmentPhase') query = query.eq('development_phase', filters.developmentPhase);
    if (filters.moleculeType && ignoreFilter !== 'moleculeType') query = query.eq('molecule_type', filters.moleculeType);
    if (filters.sponsor && ignoreFilter !== 'sponsor') query = query.eq('companies.company_name', filters.sponsor);
    if (filters.therapeuticArea && ignoreFilter !== 'therapeuticArea') query = query.eq('drug_indications.therapeutic_area', filters.therapeuticArea);
    if (filters.indication && ignoreFilter !== 'indication') query = query.eq('drug_indications.indication', filters.indication);
    if (filters.cancerType && ignoreFilter !== 'cancerType') query = query.eq('drug_indications.cancer_type', filters.cancerType);
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
    const phase = d.development_phase || '';
    if (d.approval_status === 'Approved' || phase === 'Approved') {
      approved++;
    } else if (['Phase III', 'Filed'].includes(phase)) {
      late++;
    } else if (phase === 'Phase II') {
      mid++;
    } else if (['Discovery', 'Preclinical', 'Phase I'].includes(phase)) {
      early++;
    }
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

  const cancerData: Record<string, {
    count: number;
    phases: Record<string, number>;
    companies: Record<string, number>;
    targets: Record<string, number>;
    drugsSet: Set<number>;
  }> = {};

  rawDrugs.forEach((d: any) => {
    const cancerTypes = Array.isArray(d.drug_indications) ? d.drug_indications : [d.drug_indications];
    cancerTypes.forEach((ind: any) => {
      if (ind && ind.cancer_type) {
        const ct = ind.cancer_type;
        if (!cancerData[ct]) {
          cancerData[ct] = {
            count: 0,
            phases: {},
            companies: {},
            targets: {},
            drugsSet: new Set()
          };
        }
        const cData = cancerData[ct];
        
        if (!cData.drugsSet.has(d.id)) {
          cData.drugsSet.add(d.id);
          cData.count += 1;
          
          const phase = d.development_phase || 'Unknown';
          cData.phases[phase] = (cData.phases[phase] || 0) + 1;
          
          if (d.companies?.company_name) {
            const comp = d.companies.company_name;
            cData.companies[comp] = (cData.companies[comp] || 0) + 1;
          }
          
          if (d.target) {
            cData.targets[d.target] = (cData.targets[d.target] || 0) + 1;
          }
        }
      }
    });
  });

  return Object.entries(cancerData).map(([name, data]) => {
    const phaseDistribution = Object.entries(data.phases)
      .map(([phase, count]) => ({ phase, count }))
      .sort((a, b) => b.count - a.count);

    const approved = data.phases['Approved'] || 0;
    const lateStage = (data.phases['Phase III'] || 0) + (data.phases['Filed'] || 0) + approved;

    const topTargetEntry = Object.entries(data.targets).sort((a, b) => b[1] - a[1])[0];
    const topTarget = topTargetEntry ? { name: topTargetEntry[0], count: topTargetEntry[1] } : undefined;

    const leadingCompanyEntry = Object.entries(data.companies).sort((a, b) => b[1] - a[1])[0];
    const leadingCompany = leadingCompanyEntry ? { name: leadingCompanyEntry[0], drugs: leadingCompanyEntry[1] } : undefined;

    return {
      name,
      value: data.count,
      details: {
        totalDrugs: data.count,
        phaseDistribution,
        kpiTiles: [
          { label: 'Companies', value: Object.keys(data.companies).length },
          { label: 'Approved', value: approved }
        ],
        footerMetrics: [
          ...(topTarget ? [{ label: 'Top Target', primaryText: topTarget.name, secondaryText: `${topTarget.count} Drugs`, icon: 'target' }] : []),
          ...(leadingCompany ? [{ label: 'Leading Company', primaryText: leadingCompany.name, secondaryText: `${leadingCompany.drugs} Drugs`, icon: 'building' }] : [])
        ]
      }
    };
  }).sort((a, b) => b.value - a.value).slice(0, 10);
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
  
  const sponsorData: Record<string, {
    count: number;
    phases: Record<string, number>;
    molecules: Record<string, number>;
    indications: Record<string, number>;
    uniqueIndications: Set<string>;
  }> = {};

  drugs.forEach((d: any) => {
    const sponsor = d.companies?.company_name || 'Unknown';
    if (!sponsorData[sponsor]) {
      sponsorData[sponsor] = {
        count: 0,
        phases: {},
        molecules: {},
        indications: {},
        uniqueIndications: new Set()
      };
    }

    const sData = sponsorData[sponsor];
    sData.count += 1;

    // Phases
    const phase = d.development_phase || 'Unknown';
    sData.phases[phase] = (sData.phases[phase] || 0) + 1;

    // Molecules
    const mol = d.molecule_type || 'Unknown';
    sData.molecules[mol] = (sData.molecules[mol] || 0) + 1;

    // Indications
    const cancerTypes = Array.isArray(d.drug_indications) ? d.drug_indications : [d.drug_indications];
    cancerTypes.forEach((ind: any) => {
      if (ind && ind.cancer_type) {
        sData.indications[ind.cancer_type] = (sData.indications[ind.cancer_type] || 0) + 1;
        sData.uniqueIndications.add(ind.cancer_type);
      }
    });
  });

  return Object.entries(sponsorData).map(([name, data]) => {
    const phaseDistribution = Object.entries(data.phases)
      .map(([phase, count]) => ({ phase, count }))
      .sort((a, b) => b.count - a.count);

    const moleculeDistribution = Object.entries(data.molecules)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    const topIndications = Object.entries(data.indications)
      .map(([indName, count]) => ({ name: indName, count }))
      .sort((a, b) => b.count - a.count);

    const approved = data.phases['Approved'] || 0;
    const lateStage = (data.phases['Phase III'] || 0) + (data.phases['Filed'] || 0) + approved;

    const topIndication = topIndications[0];
    const topMolecule = moleculeDistribution[0];

    return {
      name,
      value: data.count,
      details: {
        totalDrugs: data.count,
        phaseDistribution,
        kpiTiles: [
          { label: 'Indications', value: data.uniqueIndications.size },
          { label: 'Approved', value: approved }
        ],
        footerMetrics: [
          ...(topIndication ? [{ label: 'Top Indication', primaryText: topIndication.name, secondaryText: `${topIndication.count} Drugs`, icon: 'target' }] : []),
          ...(topMolecule ? [{ label: 'Top Molecule', primaryText: topMolecule.type, secondaryText: `${topMolecule.count} Drugs`, icon: 'flask' }] : [])
        ]
      }
    };
  }).sort((a, b) => b.value - a.value).slice(0, 10);
}

export async function getUpcomingCatalysts(filters?: Record<string, string>, limit = 100): Promise<UpcomingEvent[]> {
  // To filter catalysts, we need to apply filters on the related drug
  const supabase = await createServerClient();
  const { data: validDrugs } = await buildDrugQuery(supabase, filters);
  const validDrugIds = validDrugs ? Array.from(new Set(validDrugs.map((d: any) => d.id))) : [];

  let query = supabase.from('upcoming_events')
    .select('*, drugs(drug_name, development_phase, companies(company_name), drug_indications(indication))')
    .order('expected_date', { ascending: false })
    .limit(limit);

  if (filters && Object.keys(filters).length > 0 && validDrugIds.length > 0) {
    query = query.in('drug_id', validDrugIds);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  
  return data.map((item: any) => ({
    ...item,
    drug_name: item.drugs?.drug_name,
    company_name: item.drugs?.companies?.company_name,
    phase: item.drugs?.development_phase || 'Unknown',
    indication: item.drugs?.drug_indications?.[0]?.indication || 'Unknown'
  }));
}

export async function getRecentUpdates(filters?: Record<string, string>): Promise<DrugUpdate[]> {
  const supabase = await createServerClient();
  const { data: validDrugs } = await buildDrugQuery(supabase, filters);
  const validDrugIds = validDrugs ? Array.from(new Set(validDrugs.map((d: any) => d.id))) : [];

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
