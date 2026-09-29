import React, { useState } from 'react';
import { OrderItem } from '../../types/dashboard';
import { computeMonthlyBenchmarks } from '../../data/mockSalesData';
import { Columns3, HelpCircle } from 'lucide-react';

interface MonthlyClusteredChartProps {
  orders: OrderItem[];
}

export const MonthlyClusteredChart: React.FC<MonthlyClusteredChartProps> = ({ orders }) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const benchmarks = computeMonthlyBenchmarks(orders);
  const maxBenchmarkVal = Math.max(
    ...benchmarks.flatMap(b => [b.actual2024, b.prior2023, b.budget2024]),
    1000
  );

  const chartHeight = 220;
  const chartWidth = 640;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = chartWidth - paddingX * 2;
  const plotHeight = chartHeight - paddingY * 2;

  const groupWidth = plotWidth / benchmarks.length;
  const barWidth = 10;
  const barSpacing = 3;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Columns3 className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Monthly Comparison (Clustered Column Chart)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tri-metric cluster: 2024 Actual vs 2023 Prior Year vs 2024 Budget Target
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500"></span>
            <span>2024 Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-600"></span>
            <span>2023 Prior</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-400"></span>
            <span>Budget Target</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = chartHeight - paddingY - ratio * plotHeight;
            const val = Math.round(ratio * maxBenchmarkVal);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-500 font-mono"
                >
                  ${(val / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Monthly Clusters */}
          {benchmarks.map((b, idx) => {
            const groupCenterX = paddingX + idx * groupWidth + groupWidth / 2;
            const isHovered = hoveredMonth === b.month;

            const hActual = (b.actual2024 / maxBenchmarkVal) * plotHeight;
            const hPrior = (b.prior2023 / maxBenchmarkVal) * plotHeight;
            const hBudget = (b.budget2024 / maxBenchmarkVal) * plotHeight;

            const yBaseline = chartHeight - paddingY;

            const xActual = groupCenterX - barWidth * 1.5 - barSpacing;
            const xPrior = groupCenterX - barWidth * 0.5;
            const xBudget = groupCenterX + barWidth * 0.5 + barSpacing;

            return (
              <g
                key={b.month}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredMonth(b.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Background hover highlight column */}
                {isHovered && (
                  <rect
                    x={paddingX + idx * groupWidth + 2}
                    y={paddingY}
                    width={groupWidth - 4}
                    height={plotHeight}
                    fill="#312e81"
                    opacity="0.2"
                    rx="4"
                  />
                )}

                {/* 1. Actual 2024 Bar */}
                <rect
                  x={xActual}
                  y={yBaseline - hActual}
                  width={barWidth}
                  height={Math.max(2, hActual)}
                  fill={isHovered ? '#818cf8' : '#6366f1'}
                  rx="1.5"
                  className="transition-all"
                />

                {/* 2. Prior 2023 Bar */}
                <rect
                  x={xPrior}
                  y={yBaseline - hPrior}
                  width={barWidth}
                  height={Math.max(2, hPrior)}
                  fill={isHovered ? '#94a3b8' : '#475569'}
                  rx="1.5"
                  className="transition-all"
                />

                {/* 3. Budget Target Bar */}
                <rect
                  x={xBudget}
                  y={yBaseline - hBudget}
                  width={barWidth}
                  height={Math.max(2, hBudget)}
                  fill={isHovered ? '#fcd34d' : '#f59e0b'}
                  rx="1.5"
                  className="transition-all"
                />

                {/* Month Label */}
                <text
                  x={groupCenterX}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`text-[11px] font-mono transition-colors ${
                    isHovered ? 'fill-amber-300 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {b.monthName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredMonth !== null && (
          <div
            className="absolute top-2 pointer-events-none bg-slate-950/95 border border-amber-500/40 rounded-lg p-3 shadow-xl backdrop-blur-md text-xs z-20 min-w-48"
            style={{
              left: `${Math.min(
                Math.max(8, ((hoveredMonth - 0.5) / 12) * 100 - 15),
                70
              )}%`
            }}
          >
            {(() => {
              const b = benchmarks.find(item => item.month === hoveredMonth);
              if (!b) return null;
              const varianceYoY = b.prior2023 > 0 ? Math.round(((b.actual2024 - b.prior2023) / b.prior2023) * 100) : 0;
              const varianceBudget = b.budget2024 > 0 ? Math.round(((b.actual2024 - b.budget2024) / b.budget2024) * 100) : 0;

              return (
                <div>
                  <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1.5 mb-1.5 flex items-center justify-between">
                    <span>{b.monthName} Variance Audit</span>
                    <span className={`text-[10px] font-mono ${varianceBudget >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {varianceBudget >= 0 ? '+' : ''}{varianceBudget}% vs Budget
                    </span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-indigo-400 font-medium">2024 Actual:</span>
                      <span className="text-white font-bold">${b.actual2024.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">2023 Prior:</span>
                      <span className="text-slate-300">${b.prior2023.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-400">Budget Target:</span>
                      <span className="text-amber-300 font-bold">${b.budget2024.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                      <span className="text-slate-400">YoY Pace:</span>
                      <span className="text-emerald-400 font-medium">+{varianceYoY}% growth</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
