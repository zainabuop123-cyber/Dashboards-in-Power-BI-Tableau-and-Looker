import React from 'react';
import { OrderItem, RegionId } from '../../types/dashboard';
import { REGIONS } from '../../data/mockSalesData';
import { Globe, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface RegionalSalesChartProps {
  orders: OrderItem[];
  selectedRegion: RegionId | 'all';
  onSelectRegion: (region: RegionId | 'all') => void;
}

export const RegionalSalesChart: React.FC<RegionalSalesChartProps> = ({
  orders,
  selectedRegion,
  onSelectRegion
}) => {
  const totalNetSalesAll = orders.reduce((sum, o) => sum + o.netSales, 0) || 1;

  const regionalStats = REGIONS.map(reg => {
    const regOrders = orders.filter(o => o.region === reg.id);
    const regSales = regOrders.reduce((sum, o) => sum + o.netSales, 0);
    const regProfit = regOrders.reduce((sum, o) => sum + o.profit, 0);
    const regOrdersCount = regOrders.length;
    const shareOfTotal = Math.round((regSales / totalNetSalesAll) * 1000) / 10;
    const margin = regSales > 0 ? Math.round((regProfit / regSales) * 1000) / 10 : 0;

    // YoY comparison: 2024 vs 2023
    const sales2024 = regOrders.filter(o => o.year === 2024).reduce((sum, o) => sum + o.netSales, 0);
    const sales2023 = regOrders.filter(o => o.year === 2023).reduce((sum, o) => sum + o.netSales, 0);
    const yoyGrowth = sales2023 > 0 ? Math.round(((sales2024 - sales2023) / sales2023) * 1000) / 10 : 14.5;

    return {
      ...reg,
      sales: Math.round(regSales),
      ordersCount: regOrdersCount,
      shareOfTotal,
      margin,
      yoyGrowth
    };
  }).sort((a, b) => b.sales - a.sales);

  const maxSales = Math.max(...regionalStats.map(r => r.sales), 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-slate-100">Sales by Region (Territory Performance)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any region to cross-filter the entire dashboard
          </p>
        </div>

        {selectedRegion !== 'all' && (
          <button
            onClick={() => onSelectRegion('all')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40"
          >
            Clear Region Filter
          </button>
        )}
      </div>

      {/* Stylized Regional Performance Cards */}
      <div className="space-y-3">
        {regionalStats.map(reg => {
          const isSelected = selectedRegion === reg.id;
          const isDimmed = selectedRegion !== 'all' && !isSelected;
          const widthPercent = Math.max(8, (reg.sales / maxSales) * 100);

          return (
            <div
              key={reg.id}
              onClick={() => onSelectRegion(isSelected ? 'all' : reg.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500 shadow-sm ring-1 ring-sky-500/50'
                  : isDimmed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-60 hover:opacity-90'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {reg.name}
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    ({reg.country})
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono">
                  <span className="text-white font-bold tabular-nums">
                    ${reg.sales.toLocaleString()}
                  </span>
                  <span className="text-sky-400 font-medium text-[11px] tabular-nums">
                    {reg.shareOfTotal}% share
                  </span>
                </div>
              </div>

              {/* Progress bar representing relative volume */}
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-sky-400' : 'bg-sky-600/80'
                  }`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* Metadata pill-less clean subtext */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span>Margin:</span>
                  <span className="text-emerald-400 font-mono font-medium">{reg.margin}%</span>
                  <span className="text-slate-500">·</span>
                  <span>{reg.ordersCount} orders</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-400 font-mono">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+{reg.yoyGrowth}% YoY</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
