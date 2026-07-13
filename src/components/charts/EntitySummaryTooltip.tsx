'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Target, Pill, Building2, FlaskConical, Stethoscope, Info } from 'lucide-react';
import { ChartDataCount } from '@/types/dashboard';

const THEME_COLORS = {
  light: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  dark: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#F8FAFC', '#9CA3AF'],
  system: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  claude: ['#D97757', '#332D2B', '#B06550', '#79716B', '#E19B84', '#5C5552', '#D4CCC1'],
  professional: ['#0284C7', '#0369A1', '#0EA5E9', '#38BDF8', '#075985', '#0C4A6E', '#94A3B8'],
};

interface EntitySummaryTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  icon?: React.ReactNode;
}

const getIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'target': return <Target size={18} className="text-purple-500 opacity-80" />;
    case 'building': return <Building2 size={18} className="text-blue-500 opacity-80" />;
    case 'flask': return <FlaskConical size={18} className="text-[var(--color-brand-primary)] opacity-80" />;
    default: return <Target size={18} className="text-gray-500 opacity-80" />;
  }
};

export function EntitySummaryTooltip({ active, payload, icon = <Pill size={16} /> }: EntitySummaryTooltipProps) {
  const { theme } = useTheme();
  const activeTheme = (theme && THEME_COLORS[theme as keyof typeof THEME_COLORS]) ? theme : 'light';
  const colors = THEME_COLORS[activeTheme as keyof typeof THEME_COLORS];

  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataCount;
    const name = data.name;
    const total = data.value;
    const details = data.details;

    if (!details) {
      return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-lg shadow-xl min-w-[200px]">
          <p className="font-semibold text-[var(--color-brand-navy)] mb-1">{name}</p>
          <p className="text-sm text-[var(--color-muted)]">
            Total: <span className="font-medium text-[var(--color-brand-navy)]">{total.toLocaleString()}</span>
          </p>
        </div>
      );
    }

    // Calculate conic gradient for the donut chart
    let currentPercentage = 0;
    const gradientStops = details.phaseDistribution.map((item, index) => {
      const percentage = (item.count / total) * 100;
      const start = currentPercentage;
      const end = currentPercentage + percentage;
      currentPercentage = end;
      const color = colors[index % colors.length];
      return `${color} ${start}% ${end}%`;
    });
    const conicGradient = `conic-gradient(${gradientStops.join(', ')})`;

    return (
      <div className="bg-[var(--color-surface)] text-[var(--color-text-main)] p-4 rounded-xl shadow-2xl min-w-[340px] max-w-[420px] font-sans border border-[var(--color-border)] z-[9999]">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border)] mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-brand-primary)]">
              {icon}
            </div>
            <h3 className="font-semibold text-base m-0 text-[var(--color-text-main)] truncate max-w-[200px]" title={name}>{name}</h3>
          </div>
          <div className="text-right flex items-baseline gap-1">
            <span className="text-lg font-bold text-[var(--color-brand-primary)]">{total}</span>
            <span className="text-xs text-[var(--color-muted)]">Drugs</span>
          </div>
        </div>

        {/* Body: Donut + Legend & KPI Tiles */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-[100px] h-[100px] flex items-center justify-center flex-shrink-0 mt-1">
            <div 
              className="absolute inset-0 rounded-full"
              style={{ background: conicGradient }}
            />
            {/* Inner circle to make it a donut */}
            <div className="absolute inset-0 m-[15px] bg-[var(--color-surface)] rounded-full flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[var(--color-text-main)] leading-tight">{total}</span>
              <span className="text-[10px] text-[var(--color-muted)]">Total</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-3">
            {/* KPI Tiles */}
            {details.kpiTiles && details.kpiTiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {details.kpiTiles.map((kpi, i) => (
                  <div key={i} className="flex-1 min-w-[60px] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md p-1.5 text-center relative group">
                    <div className="text-[13px] font-bold text-[var(--color-brand-primary)] leading-tight">{kpi.value}</div>
                    <div className="text-[9px] text-[var(--color-muted)] leading-tight mt-0.5 flex items-center justify-center gap-0.5">
                      {kpi.label}{kpi.label === 'Late Stage' && '*'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Phase Distribution */}
            <div className="space-y-1.5">
              {details.phaseDistribution.map((item, index) => (
                <div key={item.phase} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: colors[index % colors.length] }} 
                    />
                    <span className="text-[var(--color-text-main)] truncate max-w-[90px]" title={item.phase}>{item.phase}</span>
                  </div>
                  <span className="font-medium text-[var(--color-text-main)] bg-[var(--color-bg)] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[10px]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Dynamic Metrics */}
        {details.footerMetrics && details.footerMetrics.length > 0 && (
          <div className={`grid gap-2 pt-3 border-t border-[var(--color-border)] ${details.footerMetrics.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {details.footerMetrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2 bg-[var(--color-bg)] p-2 rounded-lg border border-[var(--color-border)]">
                {getIcon(metric.icon)}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-[var(--color-muted)]">{metric.label}</span>
                  <div className="flex items-baseline gap-1 min-w-0">
                    <span className="text-[13px] font-semibold text-[var(--color-text-main)] truncate" title={metric.primaryText}>
                      {metric.primaryText}
                    </span>
                    {metric.secondaryText && (
                      <span className="text-[10px] text-[var(--color-muted)] flex-shrink-0">
                        {metric.secondaryText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footnote for Late Stage */}
        {details.kpiTiles && details.kpiTiles.some(kpi => kpi.label === 'Late Stage') && (
          <div className="mt-2 text-center text-[10px] text-[var(--color-muted)] italic opacity-80">
            * Late Stage = Phase III, Filed & Approved
          </div>
        )}
      </div>
    );
  }

  return null;
}
