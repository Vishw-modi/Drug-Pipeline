'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';

import { useTheme } from 'next-themes';

interface HorizontalBarChartProps {
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

export function HorizontalBarChart({ data, height }: HorizontalBarChartProps) {
  const { theme } = useTheme();
  
  // Resolve current theme array
  const activeTheme = (theme && THEME_COLORS[theme as keyof typeof THEME_COLORS]) ? theme : 'light';
  const baseColors = THEME_COLORS[activeTheme as keyof typeof THEME_COLORS];
  const barColor = baseColors[0]; // Primary theme color

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[var(--color-muted)] text-sm">
        No data available
      </div>
    );
  }

  // Calculate dynamic height based on number of items to prevent overlapping
  // 40px per item + 60px for margins
  const dynamicHeight = Math.max(250, data.length * 40 + 60);
  const finalHeight = height || dynamicHeight;

  return (
    <ResponsiveContainer width="100%" height={finalHeight as any}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
        <XAxis type="number" hide domain={[0, 'dataMax']} />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--color-muted)', fontSize: 12 }} 
          width={110} 
        />
        <Tooltip 
          cursor={{ fill: 'var(--color-border)', opacity: 0.4 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0];
              const name = data.payload.name || '';
              
              // Generate a leadership insight based on the category
              let insight = 'Significant contributor to the oncology portfolio.';
              if (name.includes('Breast') || name.includes('Lung')) insight = 'High-prevalence indication with large market potential.';
              if (name.includes('Rare')) insight = 'Niche indication with potential orphan drug benefits.';
              if (data.value > 15) insight = 'Core strategic focus area with heavy investment.';
              
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-lg shadow-lg max-w-xs">
                  <p className="font-semibold text-[var(--color-brand-navy)] mb-1">{name}</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    Drugs: <span className="font-medium text-[var(--color-brand-navy)]">{data.value?.toLocaleString()}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        /><Bar dataKey="value" fill={barColor} radius={[0, 4, 4, 0]} barSize={16}>
          <LabelList dataKey="value" position="right" fill="var(--color-brand-navy)" fontSize={12} fontWeight={600} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
