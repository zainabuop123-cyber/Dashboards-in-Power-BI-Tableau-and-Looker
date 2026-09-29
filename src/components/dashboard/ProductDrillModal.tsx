import React from 'react';
import { OrderItem } from '../../types/dashboard';
import { PRODUCTS_CATALOG } from '../../data/mockSalesData';
import { X, PackageCheck, DollarSign, Percent, TrendingUp, AlertCircle, ShoppingBag } from 'lucide-react';

interface ProductDrillModalProps {
  productName: string | null;
  orders: OrderItem[];
  onClose: () => void;
}

export const ProductDrillModal: React.FC<ProductDrillModalProps> = ({
  productName,
  orders,
  onClose
}) => {
  if (!productName) return null;

  const catalogItem = PRODUCTS_CATALOG.find(p => p.name === productName);
  const productOrders = orders.filter(o => o.productName === productName);

  const totalSales = productOrders.reduce((sum, o) => sum + o.netSales, 0);
  const totalGross = productOrders.reduce((sum, o) => sum + o.grossSales, 0);
  const totalDiscounts = productOrders.reduce((sum, o) => sum + o.discountAmount, 0);
  const totalCogs = productOrders.reduce((sum, o) => sum + o.cogs, 0);
  const totalProfit = productOrders.reduce((sum, o) => sum + o.profit, 0);
  const totalUnits = productOrders.reduce((sum, o) => sum + o.quantity, 0);
  const marginPct = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
  const avgDiscountRate = totalGross > 0 ? (totalDiscounts / totalGross) * 100 : 0;

  // Regional breakdown for this SKU
  const regions = ['NA', 'EU', 'APAC', 'LATAM'];
  const regionNames: Record<string, string> = {
    NA: 'North America',
    EU: 'Europe',
    APAC: 'Asia-Pacific',
    LATAM: 'Latin America'
  };

  const regionalBreakdown = regions.map(reg => {
    const regOrders = productOrders.filter(o => o.region === reg);
    const regSales = regOrders.reduce((sum, o) => sum + o.netSales, 0);
    return {
      id: reg,
      name: regionNames[reg],
      sales: Math.round(regSales),
      orders: regOrders.length,
      share: totalSales > 0 ? Math.round((regSales / totalSales) * 100) : 0
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>DRILL-THROUGH DOSSIER · {catalogItem?.sku || 'SKU'}</span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {productName}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>{catalogItem?.category}</span>
              <span>·</span>
              <span>{catalogItem?.subCategory}</span>
              <span>·</span>
              <span className="font-mono text-slate-300">MSRP: ${catalogItem?.basePrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Key SKU Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400">Total Net Revenue</span>
              <div className="text-base font-bold text-white font-mono mt-0.5 tabular-nums">
                ${Math.round(totalSales).toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Recognized</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400">Units Dispatched</span>
              <div className="text-base font-bold text-white font-mono mt-0.5 tabular-nums">
                {totalUnits.toLocaleString()} units
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{productOrders.length} orders</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400">Realized Margin</span>
              <div className={`text-base font-bold font-mono mt-0.5 tabular-nums ${marginPct >= 28 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {marginPct.toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-500 font-mono">${Math.round(totalProfit).toLocaleString()} profit</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400">Avg Discount Depth</span>
              <div className="text-base font-bold text-slate-200 font-mono mt-0.5 tabular-nums">
                {avgDiscountRate.toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-500 font-mono">${Math.round(totalDiscounts).toLocaleString()} off</span>
            </div>
          </div>

          {/* Revenue Waterfall Breakdown */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Unit Economics & Gross-to-Net Waterfall
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span>1. Gross Sales Volume (MSRP * Units):</span>
                <span>${Math.round(totalGross).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-rose-400 pl-4 border-l-2 border-rose-500/40">
                <span>(-) Promotional Discounts & Markdowns:</span>
                <span>-${Math.round(totalDiscounts).toLocaleString()} ({avgDiscountRate.toFixed(1)}%)</span>
              </div>
              <div className="flex justify-between items-center text-indigo-300 font-semibold pt-1 border-t border-slate-800">
                <span>2. Recognized Net Revenue:</span>
                <span>${Math.round(totalSales).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 pl-4 border-l-2 border-slate-700">
                <span>(-) Landed Cost of Goods Sold (COGS):</span>
                <span>-${Math.round(totalCogs).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-bold pt-1.5 border-t border-slate-800 text-sm">
                <span>3. Gross Margin Retained:</span>
                <span>${Math.round(totalProfit).toLocaleString()} ({marginPct.toFixed(1)}%)</span>
              </div>
            </div>
          </div>

          {/* Regional Territory Penetration */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Territorial Distribution
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {regionalBreakdown.map(reg => (
                <div key={reg.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 truncate">{reg.name}</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">${reg.sales.toLocaleString()}</div>
                  <div className="text-[10px] text-sky-400 font-mono mt-0.5">{reg.share}% of SKU sales</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Analyst Recommendation */}
          <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-indigo-300">Merchandising Recommendation:</span>
              <p className="text-slate-300 mt-0.5 leading-relaxed">
                {marginPct >= 28
                  ? 'Strong product margin profile (> 28%). Prioritize this item in high-visibility homepage banner slots and email marketing campaigns to expand gross contribution margin.'
                  : 'Product margin is under pressure due to heavy promotional discounting and higher manufacturing costs. Recommend reducing coupon depth to max 10% and bundling with high-margin accessories.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
