import React from 'react';
import { Card, CardContent } from './card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
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
          <div className="p-3 bg-slate-50 text-[var(--color-brand-primary)] rounded-full">
            {icon}
          </div>
        )}
      </CardContent>
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
