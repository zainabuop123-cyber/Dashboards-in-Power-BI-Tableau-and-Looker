import React, { useState } from 'react';
import { OrderItem, CategoryName } from '../../types/dashboard';
import { PieChart, Filter } from 'lucide-react';

interface CategoryDonutChartProps {
  orders: OrderItem[];
  selectedCategory: CategoryName | 'all';
  onSelectCategory: (cat: CategoryName | 'all') => void;
}

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({
  orders,
  selectedCategory,
  onSelectCategory
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryName | null>(null);

  const categories: { name: CategoryName; color: string; hoverColor: string }[] = [
    { name: 'Technology & Electronics', color: '#6366f1', hoverColor: '#818cf8' },
    { name: 'Home & Living', color: '#0ea5e9', hoverColor: '#38bdf8' },
    { name: 'Fashion & Apparel', color: '#10b981', hoverColor: '#34d399' },
    { name: 'Beauty & Personal Care', color: '#f59e0b', hoverColor: '#fbbf24' }
  ];

  const totalSales = orders.reduce((sum, o) => sum + o.netSales, 0) || 1;

  const categoryStats = categories.map(cat => {
    const catOrders = orders.filter(o => o.category === cat.name);
    const revenue = catOrders.reduce((sum, o) => sum + o.netSales, 0);
    const profit = catOrders.reduce((sum, o) => sum + o.profit, 0);
    const units = catOrders.reduce((sum, o) => sum + o.quantity, 0);
    const share = Math.round((revenue / totalSales) * 1000) / 10;
    const margin = revenue > 0 ? Math.round((profit / revenue) * 1000) / 10 : 0;

    return {
      ...cat,
      revenue: Math.round(revenue),
      units,
      share,
      margin,
      ordersCount: catOrders.length
    };
  });

  // SVG Donut calculations
  const size = 180;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const slices = categoryStats.map(cat => {
    const strokeDasharray = `${(cat.share / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeOffset;
    cumulativeOffset += (cat.share / 100) * circumference;

    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset
    };
  });

  const activeCategoryData = hoveredCategory
    ? categoryStats.find(c => c.name === hoveredCategory)
    : selectedCategory !== 'all'
    ? categoryStats.find(c => c.name === selectedCategory)
    : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-100">Sales by Category (Merchandise Mix)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any segment to isolate category performance
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut graphic */}
        <div className="md:col-span-5 flex justify-center relative">
          <svg width={size} height={size} className="transform -rotate-90 select-none">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#1e293b"
              strokeWidth={strokeWidth}
            />

            {slices.map(slice => {
              const isSelected = selectedCategory === slice.name;
              const isHovered = hoveredCategory === slice.name;
              const isDimmed =
                (selectedCategory !== 'all' && !isSelected) ||
                (hoveredCategory !== null && !isHovered);

              return (
                <circle
                  key={slice.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={isHovered ? slice.hoverColor : slice.color}
                  strokeWidth={isHovered || isSelected ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="butt"
                  opacity={isDimmed ? 0.35 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredCategory(slice.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => onSelectCategory(isSelected ? 'all' : slice.name)}
                />
              );
            })}
          </svg>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              {activeCategoryData ? activeCategoryData.name.split(' ')[0] : 'Total Sales'}
            </span>
            <span className="text-sm font-bold text-white font-mono tabular-nums">
              ${activeCategoryData ? activeCategoryData.revenue.toLocaleString() : Math.round(totalSales).toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              {activeCategoryData ? `${activeCategoryData.share}% share` : '100%'}
            </span>
          </div>
        </div>

        {/* Legend & Breakdown List */}
        <div className="md:col-span-7 space-y-2">
          {categoryStats.map(cat => {
            const isSelected = selectedCategory === cat.name;
            const isHovered = hoveredCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.name)}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-2 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
                    : isHovered
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className={`font-medium ${isSelected ? 'text-white font-semibold' : 'text-slate-200'}`}>
                      {cat.name}
                    </span>
                  </div>

                  <span className="font-mono text-white font-bold tabular-nums">
                    ${cat.revenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 pl-4.5 font-mono">
                  <span>{cat.share}% of total</span>
                  <div className="flex items-center gap-2">
                    <span>{cat.units} units</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400">{cat.margin}% margin</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
