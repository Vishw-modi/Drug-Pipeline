'use client';

import React, { useTransition, useState, useMemo } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartDataCount } from '@/types/dashboard';
import { EntitySummaryTooltip } from './EntitySummaryTooltip';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

interface HorizontalBarChartProps {
  data: ChartDataCount[];
  height?: number | string;
  filterKey?: string;
  tooltipIcon?: React.ReactNode;
}

const THEME_COLORS = {
  light: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  dark: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#F8FAFC', '#9CA3AF'],
  system: ['#18A3A1', '#4F8CBD', '#EE4B77', '#F56A6A', '#2CB6B2', '#0F172A', '#9CA3AF'],
  claude: ['#D97757', '#332D2B', '#B06550', '#79716B', '#E19B84', '#5C5552', '#D4CCC1'],
  professional: ['#0284C7', '#0369A1', '#0EA5E9', '#38BDF8', '#075985', '#0C4A6E', '#94A3B8'],
};

export function HorizontalBarChart({ data, height, filterKey, tooltipIcon }: HorizontalBarChartProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isPending, startTransition] = useTransition();
  const [optimisticSelection, setOptimisticSelection] = useState<string | null>(null);

  const activeTheme = (theme && THEME_COLORS[theme as keyof typeof THEME_COLORS]) ? theme : 'light';
  const baseColors = THEME_COLORS[activeTheme as keyof typeof THEME_COLORS];
  const barColor = baseColors[0];

  const actualSelection = filterKey ? searchParams.get(filterKey) : null;
  const currentSelection = isPending ? optimisticSelection : actualSelection;

  const displayData = useMemo(() => {
    if (!currentSelection) return data;
    return [...data].sort((a, b) => {
      if (a.name === currentSelection) return -1;
      if (b.name === currentSelection) return 1;
      return 0; // Preserve relative order for others
    });
  }, [data, currentSelection]);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[var(--color-muted)] text-sm">
        No data available
      </div>
    );
  }

  const dynamicHeight = Math.max(250, data.length * 40 + 60);
  const finalHeight = height || dynamicHeight;

  const handleBarClick = (clickData: any) => {
    if (!filterKey) return;
    
    const clickedName = clickData.name;
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    let newSelection = null;
    if (currentParams.get(filterKey) === clickedName) {
      currentParams.delete(filterKey);
      newSelection = null;
    } else {
      currentParams.set(filterKey, clickedName);
      newSelection = clickedName;
    }
    
    setOptimisticSelection(newSelection);
    
    const search = currentParams.toString();
    const query = search ? `?${search}` : '';
    
    startTransition(() => {
      router.push(`${pathname}${query}`, { scroll: false });
    });
  };

  return (
    <div className="relative w-full" style={{ height: finalHeight }}>
      {isPending && (
        <div className="absolute top-0 right-4 text-xs font-medium text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-2 py-1 rounded z-10 animate-pulse">
          Updating...
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={displayData}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
        >
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
            content={<EntitySummaryTooltip icon={tooltipIcon} />}
          />
          <Bar 
            dataKey="value" 
            barSize={16}
            onClick={handleBarClick}
            style={{ cursor: filterKey ? 'pointer' : 'default' }}
            isAnimationActive={true}
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              const details = payload.details;
              
              const isOtherSelected = currentSelection && currentSelection !== payload.name;
              const fillOpacity = isOtherSelected ? 0.35 : 1;
              const clipId = `clip-${payload.name?.replace(/\\W/g, '') || 'bar'}`;

              if (!details || !details.phaseDistribution || details.phaseDistribution.length === 0) {
                return (
                  <path 
                    d={`M${x},${y} L${x + width - 4},${y} Q${x + width},${y} ${x + width},${y + 4} L${x + width},${y + height - 4} Q${x + width},${y + height} ${x + width - 4},${y + height} L${x},${y + height} Z`}
                    fill={barColor}
                    fillOpacity={fillOpacity}
                    style={{ transition: 'fill-opacity 0.3s ease' }}
                  />
                );
              }

              const total = payload.value;
              let currentX = x;

              return (
                <g style={{ transition: 'opacity 0.3s ease', opacity: fillOpacity }}>
                  <clipPath id={clipId}>
                    <path d={`M${x},${y} L${x + width - 4},${y} Q${x + width},${y} ${x + width},${y + 4} L${x + width},${y + height - 4} Q${x + width},${y + height} ${x + width - 4},${y + height} L${x},${y + height} Z`} />
                  </clipPath>
                  <g clipPath={`url(#${clipId})`}>
                    {details.phaseDistribution.map((item: any, index: number) => {
                      const segmentWidth = (item.count / total) * width;
                      const color = baseColors[index % baseColors.length];
                      const rect = (
                        <rect
                          key={item.phase}
                          x={currentX}
                          y={y}
                          width={segmentWidth}
                          height={height}
                          fill={color}
                        />
                      );
                      currentX += segmentWidth;
                      return rect;
                    })}
                  </g>
                </g>
              );
            }}
          >
            <LabelList dataKey="value" position="right" fill="var(--color-brand-navy)" fontSize={12} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
