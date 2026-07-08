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
}
