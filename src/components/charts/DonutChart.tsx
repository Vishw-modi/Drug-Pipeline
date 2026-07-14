'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';

import { useTheme } from 'next-themes';

interface DonutChartProps {
  data: ChartDataCount[];
  colorScheme?: 'default' | 'molecule';
}

const THEME_COLORS = {
  light: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  dark: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#F8FAFC', '#9CA3AF'],
  system: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  claude: ['#D97757', '#332D2B', '#B06550', '#79716B', '#E19B84', '#5C5552', '#D4CCC1'],
  professional: ['#0284C7', '#0369A1', '#0EA5E9', '#38BDF8', '#075985', '#0C4A6E', '#94A3B8'],
};

export function DonutChart({ data, colorScheme = 'default' }: DonutChartProps) {
  const { theme } = useTheme();
  
  // Resolve current theme array
  const activeTheme = (theme && THEME_COLORS[theme as keyof typeof THEME_COLORS]) ? theme : 'light';
  const baseColors = THEME_COLORS[activeTheme as keyof typeof THEME_COLORS];
  
  // Custom ordering for molecule chart specifically to match original design
  const colors = colorScheme === 'molecule' 
    ? [baseColors[2], baseColors[1], baseColors[0], baseColors[5]] 
    : baseColors;
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[var(--color-muted)] text-sm">
        No data available
      </div>
    );
  }

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const renderLegend = (props: any) => {
    const { payload } = props;
    const sortedPayload = [...payload].sort((a, b) => b.payload.value - a.payload.value);
    
    return (
      <ul className="flex flex-col gap-2.5 m-0 p-0 pl-2 list-none text-xs text-[var(--color-brand-navy)] w-full">
        {sortedPayload.map((entry: any, index: number) => {
          const percentage = total > 0 ? ((entry.payload.value / total) * 100).toFixed(1) : 0;
          return (
            <li key={`item-${index}`} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="font-medium truncate" title={entry.value}>{entry.value}</span>
              </div>
              <div className="text-right text-[var(--color-muted)] whitespace-nowrap">
                <span className="font-semibold text-[var(--color-brand-navy)]">{entry.payload.value.toLocaleString()}</span>
                <span className="ml-1">({percentage}%)</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
          <Label 
            value={total.toLocaleString()} 
            position="center" 
            dy={-8}
            className="text-lg font-bold"
            fill="var(--color-brand-navy)"
          />
          <Label 
            value="Total" 
            position="center" 
            dy={12}
            className="text-[11px] font-medium"
            fill="var(--color-muted)"
          />
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0];
              
              // Generate a leadership insight based on the category name
              let insight = 'Key segment driving future growth.';
              const name = data.name || data.payload.name || '';
              
              if (name.includes('Phase I') || name.includes('Preclinical')) insight = 'Early pipeline laying foundation for future.';
              if (name.includes('Phase II')) insight = 'Critical stage for proof of concept and efficacy.';
              if (name.includes('Phase III')) insight = 'Late-stage assets nearing potential commercialization.';
              if (name.includes('Approved')) insight = 'De-risked assets generating revenue.';
              if (name.includes('Small Molecule')) insight = 'Traditional modality with predictable manufacturing.';
              if (name.includes('Antibody')) insight = 'High-value targeted biologics.';
              
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-lg shadow-lg max-w-xs">
                  <p className="font-semibold text-[var(--color-brand-navy)] mb-1 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
                    {name}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    Count: <span className="font-medium text-[var(--color-brand-navy)]">{data.value?.toLocaleString()}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend 
          content={renderLegend} 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{ width: '55%', paddingRight: '10px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
