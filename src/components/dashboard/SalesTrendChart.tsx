import React, { useState } from 'react';
import { OrderItem } from '../../types/dashboard';
import { TrendingUp, Calendar, Layers, Eye } from 'lucide-react';

interface SalesTrendChartProps {
  orders: OrderItem[];
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ orders }) => {
  const [metricMode, setMetricMode] = useState<'sales' | 'profit' | 'orders'>('sales');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Aggregate monthly data for 2024 (current) and 2023 (prior)
  const monthlyData = months.map((monthName, idx) => {
    const monthNum = idx + 1;
    const currentOrders = orders.filter(o => o.year === 2024 && o.month === monthNum);
    const priorOrders = orders.filter(o => o.year === 2023 && o.month === monthNum);

    const currentSales = currentOrders.reduce((sum, o) => sum + o.netSales, 0);
    const priorSales = priorOrders.reduce((sum, o) => sum + o.netSales, 0);

    const currentProfit = currentOrders.reduce((sum, o) => sum + o.profit, 0);
    const priorProfit = priorOrders.reduce((sum, o) => sum + o.profit, 0);

    const currentOrderCount = currentOrders.length;
    const priorOrderCount = priorOrders.length;

    // Budget target is set ~12% above prior
    const targetSales = priorSales > 0 ? priorSales * 1.14 : currentSales * 0.95;

    return {
      month: monthName,
      monthNum,
      currentSales: Math.round(currentSales),
      priorSales: Math.round(priorSales),
      targetSales: Math.round(targetSales),
      currentProfit: Math.round(currentProfit),
      priorProfit: Math.round(priorProfit),
      currentOrders: currentOrderCount,
      priorOrders: priorOrderCount,
      profitMargin: currentSales > 0 ? Math.round((currentProfit / currentSales) * 1000) / 10 : 0
    };
  });

  // Determine values based on active metric
  const getValue = (d: typeof monthlyData[0], isCurrent: boolean) => {
    if (metricMode === 'sales') return isCurrent ? d.currentSales : d.priorSales;
    if (metricMode === 'profit') return isCurrent ? d.currentProfit : d.priorProfit;
    return isCurrent ? d.currentOrders : d.priorOrders;
  };

  const currentValues = monthlyData.map(d => getValue(d, true));
  const priorValues = monthlyData.map(d => getValue(d, false));
  const targetValues = monthlyData.map(d => metricMode === 'sales' ? d.targetSales : getValue(d, false) * 1.12);

  const maxValue = Math.max(...currentValues, ...priorValues, ...targetValues, 100);
  const chartHeight = 220;
  const chartWidth = 640;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = chartWidth - paddingX * 2;
  const plotHeight = chartHeight - paddingY * 2;

  const getCoordinates = (values: number[]) => {
    return values.map((val, idx) => {
      const x = paddingX + (idx / (values.length - 1)) * plotWidth;
      const y = chartHeight - paddingY - (val / maxValue) * plotHeight;
      return { x, y, val };
    });
  };

  const currentCoords = getCoordinates(currentValues);
  const priorCoords = getCoordinates(priorValues);
  const targetCoords = getCoordinates(targetValues);

  // Path generators
  const makeLinePath = (coords: { x: number; y: number }[]) => {
    return coords.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  };

  const currentLine = makeLinePath(currentCoords);
  const priorLine = makeLinePath(priorCoords);
  const targetLine = makeLinePath(targetCoords);

  const areaPath = `${currentLine} L ${currentCoords[currentCoords.length - 1].x},${chartHeight - paddingY} L ${currentCoords[0].x},${chartHeight - paddingY} Z`;

  const hoveredData = hoveredIndex !== null ? monthlyData[hoveredIndex] : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-100">Sales Trend Over Time (24-Month Trajectory)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            FY 2024 Actual vs FY 2023 Prior Year vs Executive Budget Target
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setMetricMode('sales')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              metricMode === 'sales' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Net Sales ($)
          </button>
          <button
            onClick={() => setMetricMode('profit')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              metricMode === 'profit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gross Profit ($)
          </button>
          <button
            onClick={() => setMetricMode('orders')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              metricMode === 'orders' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders (#)
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-indigo-500 rounded-full"></span>
          <span className="font-medium text-slate-200">2024 Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-500"></span>
          <span>2023 Prior Year</span>
        </div>
        {metricMode === 'sales' && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t-2 border-dotted border-amber-400"></span>
            <span className="text-amber-300">2024 Budget Target</span>
          </div>
        )}
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = chartHeight - paddingY - ratio * plotHeight;
            const labelVal = Math.round(ratio * maxValue);
            const formatStr = metricMode === 'orders' ? labelVal.toString() : `$${(labelVal / 1000).toFixed(0)}k`;
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
                  {formatStr}
                </text>
              </g>
            );
          })}

          {/* Area fill under current line */}
          <path d={areaPath} fill="url(#salesGradient)" />

          {/* Target line */}
          {metricMode === 'sales' && (
            <path
              d={targetLine}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />
          )}

          {/* Prior Year Line (Dashed) */}
          <path
            d={priorLine}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            opacity="0.7"
          />

          {/* Current Year Line (Solid) */}
          <path
            d={currentLine}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive hover points & vertical crosshair */}
          {currentCoords.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Invisible hover hitbox */}
                <rect
                  x={pt.x - plotWidth / (currentCoords.length * 2)}
                  y={paddingY}
                  width={plotWidth / currentCoords.length}
                  height={plotHeight}
                  fill="transparent"
                />

                {/* Vertical crosshair guide */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={chartHeight - paddingY}
                    stroke="#818cf8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#0f172a"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  className="transition-all"
                />

                {/* Prior point */}
                {isHovered && (
                  <circle
                    cx={priorCoords[idx].x}
                    cy={priorCoords[idx].y}
                    r="4"
                    fill="#64748b"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                )}

                {/* Month labels at bottom */}
                <text
                  x={pt.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`text-[11px] font-mono transition-colors ${
                    isHovered ? 'fill-indigo-300 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {months[idx]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredData && hoveredIndex !== null && (
          <div
            className="absolute top-2 pointer-events-none bg-slate-950/95 border border-indigo-500/40 rounded-lg p-3 shadow-xl backdrop-blur-md text-xs z-20 min-w-44"
            style={{
              left: `${Math.min(
                Math.max(10, (currentCoords[hoveredIndex].x / chartWidth) * 100 - 15),
                70
              )}%`
            }}
          >
            <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1.5 mb-1.5 flex items-center justify-between">
              <span>{hoveredData.month} 2024 Performance</span>
              <span className="text-[10px] text-indigo-400 font-mono">
                {hoveredData.profitMargin}% Margin
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">2024 Net Sales:</span>
                <span className="text-indigo-300 font-bold">
                  ${hoveredData.currentSales.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">2023 Prior Year:</span>
                <span className="text-slate-400">
                  ${hoveredData.priorSales.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Budget:</span>
                <span className="text-amber-400">
                  ${hoveredData.targetSales.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Orders / Profit:</span>
                <span className="text-emerald-400 font-medium">
                  {hoveredData.currentOrders} orders · ${hoveredData.currentProfit.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
