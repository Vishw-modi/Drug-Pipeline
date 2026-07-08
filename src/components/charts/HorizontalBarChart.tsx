'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';

interface HorizontalBarChartProps {
  data: ChartDataCount[];
  color?: string;
}

export function HorizontalBarChart({ data, color = '#18A3A1' }: HorizontalBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[var(--color-muted)] text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
        <XAxis type="number" hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--color-muted)', fontSize: 12 }} 
          width={150} 
        />
        <Tooltip
          cursor={{ fill: '#F8FAFC' }}
          contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={16}>
          <LabelList dataKey="value" position="right" fill="var(--color-brand-navy)" fontSize={12} fontWeight={600} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
