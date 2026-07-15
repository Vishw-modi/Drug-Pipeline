import { createClient as createBaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export const getFilterOptions = unstable_cache(
  async () => {
    const supabase = createBaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    
    const [indicationsRes, drugsRes, companiesRes] = await Promise.all([
      supabase.from('drug_indications').select('therapeutic_area, cancer_type, indication'),
      supabase.from('drugs').select('development_phase, molecule_type, drug_name'),
      supabase.from('companies').select('company_name')
    ]);

    const extractDistinct = (data: any[] | null, key: string) => {
      if (!data) return [];
      const set = new Set<string>();
      data.forEach(item => {
        if (item[key] && typeof item[key] === 'string') {
          set.add(item[key]);
        }
      });
      return Array.from(set).sort();
    };

    return {
      therapeuticAreas: extractDistinct(indicationsRes.data, 'therapeutic_area'),
      cancerTypes: extractDistinct(indicationsRes.data, 'cancer_type'),
      indications: extractDistinct(indicationsRes.data, 'indication'),
      drugs: extractDistinct(drugsRes.data, 'drug_name'),
      developmentPhases: extractDistinct(drugsRes.data, 'development_phase'),
      moleculeTypes: extractDistinct(drugsRes.data, 'molecule_type'),
      sponsors: extractDistinct(companiesRes.data, 'company_name'),
    };
  },
  ['dashboard-filter-options'],
  { revalidate: 3600 }
);

export const getCatalystFilterOptions = unstable_cache(
  async () => {
    const supabase = createBaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    
    const { data } = await supabase.from('upcoming_events')
      .select('*, drugs(drug_name, development_phase, molecule_type, companies(company_name), drug_indications(therapeutic_area, cancer_type, indication))');

    const extractDistinct = (data: any[] | null, extractor: (item: any) => string | undefined | null) => {
      if (!data) return [];
      const set = new Set<string>();
      data.forEach(item => {
        const val = extractor(item);
        if (val) set.add(val);
      });
      return Array.from(set).sort();
    };

    return {
      therapeuticAreas: extractDistinct(data, item => item.drugs?.drug_indications?.[0]?.therapeutic_area),
      cancerTypes: extractDistinct(data, item => item.drugs?.drug_indications?.[0]?.cancer_type),
      indications: extractDistinct(data, item => item.drugs?.drug_indications?.[0]?.indication),
      drugs: extractDistinct(data, item => item.drugs?.drug_name),
      developmentPhases: extractDistinct(data, item => item.drugs?.development_phase),
      moleculeTypes: extractDistinct(data, item => item.drugs?.molecule_type),
      sponsors: extractDistinct(data, item => item.drugs?.companies?.company_name),
    };
  },
  ['catalyst-filter-options'],
  { revalidate: 3600 }
);
