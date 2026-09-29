import React, { useState } from 'react';
import { OrderItem } from '../../types/dashboard';
import { BarChart3, ExternalLink, ArrowUpDown } from 'lucide-react';

interface TopProductsChartProps {
  orders: OrderItem[];
  onProductClick: (productName: string) => void;
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ orders, onProductClick }) => {
  const [viewMode, setViewMode] = useState<'top10' | 'bottom5'>('top10');

  // Aggregate by product
  const productMap = new Map<string, {
    name: string;
    category: string;
    sku: string;
    revenue: number;
    units: number;
    profit: number;
  }>();

  orders.forEach(order => {
    const existing = productMap.get(order.productName) || {
      name: order.productName,
      category: order.category,
      sku: order.sku,
      revenue: 0,
      units: 0,
      profit: 0
    };

    existing.revenue += order.netSales;
    existing.units += order.quantity;
    existing.profit += order.profit;
    productMap.set(order.productName, existing);
  });

  const allProducts = Array.from(productMap.values()).map(p => ({
    ...p,
    revenue: Math.round(p.revenue),
    profit: Math.round(p.profit),
    margin: p.revenue > 0 ? Math.round((p.profit / p.revenue) * 1000) / 10 : 0
  }));

  const sortedProducts = [...allProducts].sort((a, b) =>
    viewMode === 'top10' ? b.revenue - a.revenue : a.revenue - b.revenue
  );

  const displayedProducts = viewMode === 'top10' ? sortedProducts.slice(0, 10) : sortedProducts.slice(0, 5);
  const maxRevenue = Math.max(...displayedProducts.map(p => p.revenue), 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              {viewMode === 'top10' ? 'Top 10 Products by Revenue' : 'Bottom 5 Products (Underperformers)'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any SKU bar to open the deep-dive Drill-Through Dossier
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('top10')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'top10' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Top 10 SKUs
          </button>
          <button
            onClick={() => setViewMode('bottom5')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              viewMode === 'bottom5' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bottom 5
          </button>
        </div>
      </div>

      {/* Horizontal Bar List */}
      <div className="space-y-2.5">
        {displayedProducts.map((prod, index) => {
          const rank = viewMode === 'top10' ? index + 1 : sortedProducts.length - displayedProducts.length + index + 1;
          const barWidthPercent = Math.max(12, (prod.revenue / maxRevenue) * 100);

          return (
            <div
              key={prod.name}
              onClick={() => onProductClick(prod.name)}
              className="group p-2.5 rounded-lg bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-5 text-slate-400 font-mono font-bold text-[11px] text-right">
                    #{rank}
                  </span>
                  <span className="font-medium text-slate-200 group-hover:text-indigo-300 transition-colors truncate max-w-xs sm:max-w-sm">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden md:inline font-mono">
                    · {prod.sku}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono shrink-0 ml-2">
                  <span className="text-white font-bold tabular-nums">
                    ${prod.revenue.toLocaleString()}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>

              {/* Bar Fill */}
              <div className="w-full bg-slate-800/70 h-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-indigo-500 group-hover:bg-indigo-400 transition-all duration-300 rounded-full"
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>

              {/* Sub-metrics */}
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-400">{prod.category}</span>
                <div className="flex items-center gap-3 font-mono">
                  <span>{prod.units} units sold</span>
                  <span className="text-slate-500">·</span>
                  <span className={`font-semibold ${prod.margin >= 28 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {prod.margin}% margin
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
