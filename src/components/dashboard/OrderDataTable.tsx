import React, { useState, useMemo } from 'react';
import { OrderItem } from '../../types/dashboard';
import { Table, Search, ArrowUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface OrderDataTableProps {
  orders: OrderItem[];
  onProductClick: (productName: string) => void;
}

type SortField = 'orderDate' | 'orderNumber' | 'customerName' | 'netSales' | 'profit' | 'profitMargin' | 'quantity';

export const OrderDataTable: React.FC<OrderDataTableProps> = ({ orders, onProductClick }) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('orderDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return orders;
    return orders.filter(
      o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q) ||
        o.regionName.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let vA = a[sortField];
      let vB = b[sortField];

      if (typeof vA === 'string') {
        const cmp = (vA as string).localeCompare(vB as string);
        return sortAsc ? cmp : -cmp;
      }
      return sortAsc ? (vA as number) - (vB as number) : (vB as number) - (vA as number);
    });
  }, [filteredOrders, sortField, sortAsc]);

  const totalPages = Math.ceil(sortedOrders.length / pageSize) || 1;
  const currentOrders = sortedOrders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Granular Transaction Ledger (Fact_Sales Level)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit individual customer transactions, discounts applied, and realized margins
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search order, customer, SKU..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
            <tr>
              <th
                onClick={() => handleSort('orderNumber')}
                className="py-2.5 px-3 cursor-pointer hover:text-slate-200"
              >
                <div className="flex items-center gap-1">
                  <span>Order #</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('orderDate')}
                className="py-2.5 px-3 cursor-pointer hover:text-slate-200"
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('customerName')}
                className="py-2.5 px-3 cursor-pointer hover:text-slate-200"
              >
                <div className="flex items-center gap-1">
                  <span>Customer & Segment</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2.5 px-3">Region</th>
              <th className="py-2.5 px-3">Product Description</th>
              <th
                onClick={() => handleSort('quantity')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200"
              >
                Qty
              </th>
              <th
                onClick={() => handleSort('netSales')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Net Sales</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('profit')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Gross Profit</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('profitMargin')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200"
              >
                Margin %
              </th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 font-sans">
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  No orders match the current filter criteria.
                </td>
              </tr>
            ) : (
              currentOrders.map(order => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="py-2 px-3 font-mono font-medium text-slate-300">
                    {order.orderNumber}
                  </td>
                  <td className="py-2 px-3 text-slate-400 font-mono whitespace-nowrap">
                    {order.orderDate}
                  </td>
                  <td className="py-2 px-3">
                    <div className="font-medium text-slate-200">{order.customerName}</div>
                    <div className="text-[10px] text-slate-400">{order.segment}</div>
                  </td>
                  <td className="py-2 px-3 text-slate-400 whitespace-nowrap">
                    {order.regionName}
                  </td>
                  <td className="py-2 px-3 max-w-xs">
                    <div className="font-medium text-slate-200 truncate">{order.productName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{order.sku} · {order.category}</div>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">
                    {order.quantity}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-semibold text-white tabular-nums">
                    ${order.netSales.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-medium text-emerald-400 tabular-nums">
                    ${order.profit.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-medium tabular-nums">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[11px] ${
                        order.profitMargin >= 28
                          ? 'text-emerald-300 bg-emerald-950/60'
                          : 'text-amber-300 bg-amber-950/60'
                      }`}
                    >
                      {order.profitMargin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => onProductClick(order.productName)}
                      className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                      title="Drill down into product metrics"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-xs text-slate-400">
        <div className="font-mono">
          Showing {Math.min(filteredOrders.length, (page - 1) * pageSize + 1)} to{' '}
          {Math.min(filteredOrders.length, page * pageSize)} of {filteredOrders.length} transactions
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <span className="font-mono text-slate-300 px-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
