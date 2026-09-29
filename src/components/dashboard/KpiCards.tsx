import React from 'react';
import { KpiMetrics, BiTool } from '../../types/dashboard';
import { DollarSign, ShoppingCart, TrendingUp, Percent, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

interface KpiCardsProps {
  metrics: KpiMetrics;
  biTool: BiTool;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics, biTool }) => {
  // Theme badge classes
  const getCardBorder = () => {
    switch (biTool) {
      case 'powerbi':
        return 'border-slate-800 hover:border-amber-500/50';
      case 'tableau':
        return 'border-slate-800 hover:border-sky-500/50';
      case 'looker':
        return 'border-slate-800 hover:border-emerald-500/50';
      default:
        return 'border-slate-800 hover:border-indigo-500/50';
    }
  };

  const cards = [
    {
      title: 'Total Recognized Sales',
      subtitle: 'Net revenue after markdowns',
      value: `$${Math.round(metrics.totalSales).toLocaleString()}`,
      growth: metrics.salesGrowthPct,
      growthLabel: 'YoY Growth',
      target: `$${Math.round(metrics.targetSales).toLocaleString()}`,
      targetPct: metrics.salesVsTargetPct,
      icon: DollarSign,
      sparklineColor: '#6366f1',
      sparklinePoints: [28, 32, 29, 35, 42, 38, 48, 52, 60, 58, 72, 85]
    },
    {
      title: 'Total Order Volume',
      subtitle: 'Distinct transactions completed',
      value: metrics.totalOrders.toLocaleString(),
      growth: metrics.ordersGrowthPct,
      growthLabel: 'YoY Orders',
      target: metrics.targetOrders.toLocaleString(),
      targetPct: Math.round((metrics.totalOrders / (metrics.targetOrders || 1)) * 100),
      icon: ShoppingCart,
      sparklineColor: '#0ea5e9',
      sparklinePoints: [22, 24, 21, 28, 30, 29, 36, 38, 44, 42, 50, 62]
    },
    {
      title: 'Average Order Value (AOV)',
      subtitle: 'Net sales per order basket',
      value: `$${metrics.averageOrderValue.toFixed(2)}`,
      growth: metrics.aovGrowthPct,
      growthLabel: 'YoY AOV',
      target: `$${metrics.targetAov.toFixed(2)}`,
      targetPct: Math.round((metrics.averageOrderValue / (metrics.targetAov || 1)) * 100),
      icon: TrendingUp,
      sparklineColor: '#8b5cf6',
      sparklinePoints: [45, 47, 46, 48, 52, 51, 54, 53, 56, 58, 62, 65]
    },
    {
      title: 'Gross Profit Margin',
      subtitle: 'Net sales retained after COGS',
      value: `${metrics.profitMargin.toFixed(1)}%`,
      growth: metrics.marginGrowthPoints,
      growthLabel: 'pts vs Prior',
      target: `${metrics.targetProfitMargin.toFixed(1)}% Target`,
      targetPct: Math.round((metrics.profitMargin / (metrics.targetProfitMargin || 1)) * 100),
      icon: Percent,
      sparklineColor: '#10b981',
      sparklinePoints: [26, 27, 25, 28, 29, 28, 30, 29, 31, 30, 28, 31]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const isPositive = card.growth >= 0;
        const Icon = card.icon;

        // Render normalized mini SVG sparkline
        const maxVal = Math.max(...card.sparklinePoints);
        const minVal = Math.min(...card.sparklinePoints);
        const range = maxVal - minVal || 1;
        const width = 120;
        const height = 36;
        const step = width / (card.sparklinePoints.length - 1);
        const points = card.sparklinePoints
          .map((val, i) => `${i * step},${height - ((val - minVal) / range) * (height - 8) - 4}`)
          .join(' ');

        return (
          <div
            key={idx}
            className={`bg-slate-900 border ${getCardBorder()} rounded-xl p-4 transition-all duration-200 shadow-sm flex flex-col justify-between`}
          >
            <div>
              {/* Header: Title & Icon */}
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
                  {card.title}
                </span>
                <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Main Metric Value */}
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  {card.value}
                </span>

                {/* Growth indicator badge */}
                <div
                  className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${
                    isPositive
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                      : 'text-rose-400 bg-rose-950/60 border border-rose-800/50'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}
                    {card.growth.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 mt-0.5">
                {card.subtitle}
              </div>
            </div>

            {/* Sparkline and Target Progress */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Target className="w-3 h-3 text-slate-400" />
                  <span>Target:</span>
                  <span className="font-mono text-slate-200 tabular-nums">{card.target}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {card.targetPct}% attained
                </div>
              </div>

              {/* SVG Sparkline */}
              <div className="w-24 h-8 flex items-center justify-end">
                <svg width="96" height="32" className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={card.sparklineColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                  {/* End pulse dot */}
                  <circle
                    cx={96}
                    cy={height - ((card.sparklinePoints[card.sparklinePoints.length - 1] - minVal) / range) * (height - 8) - 4}
                    r="2.5"
                    fill={card.sparklineColor}
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
