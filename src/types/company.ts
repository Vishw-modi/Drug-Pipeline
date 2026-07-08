export interface Company {
  id: number;
  company_name: string;
  company_type: string | null;
  headquarters: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}
