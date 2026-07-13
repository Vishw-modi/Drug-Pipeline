export interface DashboardSummary {
  total_pipeline_drugs: number;
  early_stage: number;
  mid_stage: number;
  late_stage: number;
  approved: number;
}

export interface ChartDataCount {
  name: string;
  value: number;
  details?: {
    totalDrugs: number;
    phaseDistribution: { phase: string; count: number }[];
    kpiTiles?: { label: string; value: number | string; icon?: string }[];
    footerMetrics?: { label: string; primaryText: string; secondaryText?: string; icon: string }[];
    // Keeping these for backwards compatibility if needed, but the UI will mostly use kpiTiles/footerMetrics
    totalIndications?: number;
    moleculeDistribution?: { type: string; count: number }[];
    topIndications?: { name: string; count: number }[];
    totalCompanies?: number;
    topTarget?: { name: string; count: number };
    leadingCompany?: { name: string; drugs: number };
  };
}
