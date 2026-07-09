'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';

interface DonutChartProps {
  data: ChartDataCount[];
  colors?: string[];
}

const DEFAULT_COLORS = ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'];

export function DonutChart({ data, colors = DEFAULT_COLORS }: DonutChartProps) {
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
    
    return (
      <ul className="flex flex-col gap-2.5 m-0 p-0 pl-2 list-none text-xs text-[var(--color-brand-navy)] w-full">
        {payload.map((entry: any, index: number) => {
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
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
          contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ color: 'var(--color-brand-navy)' }}
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
