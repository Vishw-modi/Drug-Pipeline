import { Company } from "./company";

export interface Drug {
  id: number;
  company_id: number;
  drug_name: string;
  internal_code: string | null;
  generic_name: string | null;
  molecule_type: string | null;
  target: string | null;
  mechanism_of_action: string | null;
  development_phase: 'Discovery' | 'Preclinical' | 'Phase I' | 'Phase II' | 'Phase III' | 'Filed' | 'Approved' | 'Withdrawn' | null;
  approval_status: 'Investigational' | 'Approved' | 'Withdrawn' | 'Discontinued' | null;
  expected_launch_date: string | null;
  first_in_class: boolean | null;
  orphan_designation: boolean | null;
  fast_track: boolean | null;
  breakthrough_designation: boolean | null;
  description: string | null;
  extra_data: any;
  created_at: string;
  updated_at: string;
  
  // Joins
  company?: Company;
}

export interface DrugIndication {
  id: number;
  drug_id: number;
  therapeutic_area: string;
  cancer_type: string;
  indication: string;
  biomarker: string | null;
  line_of_therapy: string | null;
  development_phase: 'Discovery' | 'Preclinical' | 'Phase I' | 'Phase II' | 'Phase III' | 'Filed' | 'Approved' | 'Withdrawn' | null;
  approval_status: 'Investigational' | 'Approved' | 'Withdrawn' | 'Discontinued' | null;
  market_priority: 'High' | 'Medium' | 'Low' | null;
  is_primary: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
