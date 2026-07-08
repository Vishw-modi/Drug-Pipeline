export interface UpcomingEvent {
  id: number;
  drug_id: number;
  trial_id: number | null;
  event_name: string;
  event_type: 'FDA Approval' | 'FDA Submission' | 'PDUFA Date' | 'EMA Decision' | 'ASCO Presentation' | 'ESMO Presentation' | 'AACR Presentation' | 'Topline Results' | 'Interim Analysis' | 'Phase I Initiation' | 'Phase II Initiation' | 'Phase III Initiation' | 'Primary Completion' | 'Clinical Readout' | 'Commercial Launch' | 'Conference Presentation' | 'Investor Event' | 'Other';
  expected_date: string | null;
  actual_date: string | null;
  status: 'Upcoming' | 'Completed' | 'Delayed' | 'Cancelled' | null;
  importance: 'High' | 'Medium' | 'Low' | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  
  // Joined from drug
  drug_name?: string;
  company_name?: string;
}

export interface DrugUpdate {
  id: number;
  drug_id: number;
  update_title: string;
  update_summary: string | null;
  update_type: 'FDA Approval' | 'FDA Submission' | 'Clinical Trial Update' | 'Topline Results' | 'Publication' | 'Conference Presentation' | 'Company Announcement' | 'Label Expansion' | 'Partnership' | 'Acquisition' | 'Safety Update' | 'Other' | null;
  source: string | null;
  source_url: string | null;
  update_date: string | null;
  created_at: string;
  
  // Joined
  drug_name?: string;
}
