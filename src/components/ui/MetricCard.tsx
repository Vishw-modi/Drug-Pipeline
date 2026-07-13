import React from 'react';
import { Card, CardContent } from './card';

import { Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  insight?: string;
}

export function MetricCard({ title, value, icon, trend, insight }: MetricCardProps) {
  return (
    <Card className="group relative transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-default">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
            {insight && (
              <Info size={14} className="text-slate-400 opacity-40 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          <div className="flex items-baseline mt-2 gap-2">
            <h3 className="text-3xl font-semibold text-[var(--color-brand-navy)]">{value}</h3>
            {trend && (
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="p-3 bg-[var(--color-bg)] text-[var(--color-brand-primary)] rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        )}
      </CardContent>
      {insight && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-brand-navy)] text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
          <p className="text-center whitespace-normal">{insight}</p>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--color-surface)] border-t border-l border-[var(--color-border)] transform rotate-45"></div>
        </div>
      )}
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-4"></div>
        <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );
}
