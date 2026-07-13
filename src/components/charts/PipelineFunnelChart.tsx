'use client';

import React from 'react';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';
import { useTheme } from 'next-themes';

interface PipelineFunnelChartProps {
  data: ChartDataCount[];
  height?: number | string;
}

const THEME_COLORS = {
  light: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  dark: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#F8FAFC', '#9CA3AF'],
  system: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  claude: ['#D97757', '#332D2B', '#B06550', '#79716B', '#E19B84', '#5C5552', '#D4CCC1'],
  professional: ['#0284C7', '#0369A1', '#0EA5E9', '#38BDF8', '#075985', '#0C4A6E', '#94A3B8'],
};

export function PipelineFunnelChart({ data, height = 300 }: PipelineFunnelChartProps) {
  const { theme } = useTheme();
  
  const activeTheme = (theme && THEME_COLORS[theme as keyof typeof THEME_COLORS]) ? theme : 'light';
  const baseColors = THEME_COLORS[activeTheme as keyof typeof THEME_COLORS];

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[var(--color-muted)] text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height as any}>
      <FunnelChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Tooltip 
          cursor={{ fill: 'var(--color-border)', opacity: 0.2 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0];
              const phase = data.payload.phase;
              
              let insight = 'Critical stage for clinical evaluation.';
              if (phase.includes('Preclinical')) insight = 'High attrition rate expected; focus on finding lead candidates.';
              if (phase.includes('Phase I')) insight = 'Safety and dosage trials; early indicators of viability.';
              if (phase.includes('Phase II')) insight = 'Efficacy evaluation; significant inflection point for asset valuation.';
              if (phase.includes('Phase III')) insight = 'Pivotal trials; major capital requirement but highest potential return.';
              if (phase.includes('Approved')) insight = 'Successful commercialization and revenue generation phase.';
              
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-lg shadow-lg max-w-[220px]">
                  <p className="font-semibold text-[var(--color-brand-navy)] mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
                    {phase}
                  </p>
                  <div className="flex flex-col gap-1 text-sm mt-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-muted)]">Count:</span>
                      <span className="font-medium text-[var(--color-brand-navy)]">{data.value}</span>
                    </div>
                    {data.payload.dropoff !== null && (
                      <div className="flex justify-between">
                        <span className="text-[var(--color-muted)]">Transition:</span>
                        <span className="font-medium text-orange-500">{data.payload.dropoff}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Funnel dataKey="value" data={data} isAnimationActive>
          <LabelList position="center" fill="#fff" stroke="none" dataKey="name" fontSize={12} fontWeight={600} />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={baseColors[index % baseColors.length]} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
