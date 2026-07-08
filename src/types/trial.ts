export interface ClinicalTrial {
  id: number;
  drug_id: number;
  trial_name: string;
  nct_id: string | null;
  sponsor: string | null;
  phase: 'Phase I' | 'Phase I/II' | 'Phase II' | 'Phase II/III' | 'Phase III' | 'Phase IV' | null;
  status: 'Not Yet Recruiting' | 'Recruiting' | 'Active, Not Recruiting' | 'Completed' | 'Terminated' | 'Withdrawn' | 'Suspended' | 'Unknown' | null;
  study_type: 'Interventional' | 'Observational' | 'Expanded Access' | null;
  indication: string | null;
  enrollment: number | null;
  geography: string | null;
  start_date: string | null;
  primary_completion_date: string | null;
  completion_date: string | null;
  primary_endpoint: string | null;
  result_summary: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
