import { createClient as createBaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export const getFilterOptions = unstable_cache(
  async () => {
    const supabase = createBaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    
    const [indicationsRes, drugsRes, companiesRes] = await Promise.all([
      supabase.from('drug_indications').select('therapeutic_area, cancer_type'),
      supabase.from('drugs').select('development_phase, molecule_type'),
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
      developmentPhases: extractDistinct(drugsRes.data, 'development_phase'),
      moleculeTypes: extractDistinct(drugsRes.data, 'molecule_type'),
      sponsors: extractDistinct(companiesRes.data, 'company_name'),
    };
  },
  ['dashboard-filter-options'],
  { revalidate: 3600 }
);
