import React from 'react';
import { FilterState, RegionId, CategoryName, CustomerSegment } from '../../types/dashboard';
import { REGIONS, PRODUCTS_CATALOG } from '../../data/mockSalesData';
import { Filter, RotateCcw, Search, Calendar, MapPin, Layers, ShoppingBag, Users } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  onReset,
  totalCount,
  filteredCount
}) => {
  const hasActiveFilters =
    filters.dateRange !== 'all' ||
    filters.region !== 'all' ||
    filters.category !== 'all' ||
    filters.product !== 'all' ||
    filters.segment !== 'all' ||
    filters.searchQuery.trim() !== '';

  const uniqueCategories: CategoryName[] = [
    'Technology & Electronics',
    'Home & Living',
    'Fashion & Apparel',
    'Beauty & Personal Care'
  ];

  // Filter products by selected category if applicable
  const availableProducts = filters.category === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter(p => p.category === filters.category);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-slate-200">Interactive Slicers & Context Filters</span>
          <span className="text-xs text-slate-400 font-mono">
            ({filteredCount.toLocaleString()} of {totalCount.toLocaleString()} orders)
          </span>
        </div>

        {/* Date presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 md:pb-0 scrollbar-none">
          <span className="text-slate-400 mr-1 text-[11px] font-medium hidden sm:inline">Date Presets:</span>
          {(['all', '2024', '2023', 'q4', 'q3', 'q2', 'q1', 'last30'] as const).map((preset) => {
            const labels: Record<string, string> = {
              all: 'All Time',
              '2024': 'FY 2024',
              '2023': 'FY 2023',
              q4: 'Q4 Peak',
              q3: 'Q3',
              q2: 'Q2',
              q1: 'Q1',
              last30: 'Last 30D'
            };
            const isActive = filters.dateRange === preset;
            return (
              <button
                key={preset}
                onClick={() => setFilters(prev => ({ ...prev, dateRange: preset }))}
                className={`px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {labels[preset]}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors ml-2 font-medium"
              title="Reset all filters to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Slicer Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
        
        {/* 1. Region Slicer */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>Region</span>
          </label>
          <select
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value as RegionId | 'all' }))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="all">All Regions (Global)</option>
            {REGIONS.map(reg => (
              <option key={reg.id} value={reg.id}>
                {reg.name} ({reg.country})
              </option>
            ))}
          </select>
        </div>

        {/* 2. Category Slicer */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => {
              const newCat = e.target.value as CategoryName | 'all';
              setFilters(prev => ({
                ...prev,
                category: newCat,
                // reset product if selected product is not in new category
                product: 'all'
              }));
            }}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="all">All Categories (4)</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Product Slicer */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
            <span>Product SKU</span>
          </label>
          <select
            value={filters.product}
            onChange={(e) => setFilters(prev => ({ ...prev, product: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="all">All Products ({availableProducts.length})</option>
            {availableProducts.map(p => (
              <option key={p.name} value={p.name}>
                {p.name} (${p.basePrice})
              </option>
            ))}
          </select>
        </div>

        {/* 4. Customer Segment / Quick Search */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Customer Segment</span>
          </label>
          <select
            value={filters.segment}
            onChange={(e) => setFilters(prev => ({ ...prev, segment: e.target.value as CustomerSegment | 'all' }))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="all">All Segments (B2C & B2B)</option>
            <option value="Consumer (B2C)">Consumer (B2C)</option>
            <option value="Corporate (B2B)">Corporate (B2B)</option>
            <option value="Home Office">Home Office</option>
          </select>
        </div>

      </div>

      {/* Active filter summary indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 text-[11px]">Active Filters:</span>
          {filters.dateRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Date: {filters.dateRange.toUpperCase()}
              <button onClick={() => setFilters(p => ({ ...p, dateRange: 'all' }))} className="hover:text-white">×</button>
            </span>
          )}
          {filters.region !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Region: {filters.region}
              <button onClick={() => setFilters(p => ({ ...p, region: 'all' }))} className="hover:text-white">×</button>
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Category: {filters.category}
              <button onClick={() => setFilters(p => ({ ...p, category: 'all', product: 'all' }))} className="hover:text-white">×</button>
            </span>
          )}
          {filters.product !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Product: {filters.product}
              <button onClick={() => setFilters(p => ({ ...p, product: 'all' }))} className="hover:text-white">×</button>
            </span>
          )}
          {filters.segment !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Segment: {filters.segment}
              <button onClick={() => setFilters(p => ({ ...p, segment: 'all' }))} className="hover:text-white">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
