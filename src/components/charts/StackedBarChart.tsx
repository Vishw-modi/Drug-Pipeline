'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from 'next-themes';

interface StackedBarChartProps {
  data: any[];
  height?: number | string;
}

const THEME_COLORS = {
  light: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  dark: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#F8FAFC', '#9CA3AF'],
  system: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  claude: ['#D97757', '#332D2B', '#B06550', '#79716B', '#E19B84', '#5C5552', '#D4CCC1'],
  professional: ['#0284C7', '#0369A1', '#0EA5E9', '#38BDF8', '#075985', '#0C4A6E', '#94A3B8'],
};

export function StackedBarChart({ data, height = 300 }: StackedBarChartProps) {
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
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" />
        <XAxis type="number" hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--color-muted)', fontSize: 12 }} 
          width={120} 
        />
        <Tooltip 
          cursor={{ fill: 'var(--color-border)', opacity: 0.4 }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const total = payload.reduce((sum, entry) => sum + (entry.value as number), 0);
              
              let insight = 'Balanced portfolio indicating sustainable clinical advancement.';
              if (total > 10) insight = 'High-volume sponsor driving significant oncology innovation.';
              if (payload[0]?.value && (payload[0].value as number) / total > 0.6) insight = 'Pipeline heavily weighted towards early-stage discovery.';
              
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-lg shadow-lg min-w-[200px]">
                  <p className="font-semibold text-[var(--color-brand-navy)] mb-2 border-b border-[var(--color-border)] pb-1">{label}</p>
                  <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-[var(--color-muted)]">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                          {entry.name}
                        </span>
                        <span className="font-medium text-[var(--color-brand-navy)]">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--color-muted)' }} />
        <Bar dataKey="Early" stackId="a" fill={baseColors[0]} barSize={20} />
        <Bar dataKey="Mid" stackId="a" fill={baseColors[1]} />
        <Bar dataKey="Late" stackId="a" fill={baseColors[2]} />
        <Bar dataKey="Approved" stackId="a" fill={baseColors[3]} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
