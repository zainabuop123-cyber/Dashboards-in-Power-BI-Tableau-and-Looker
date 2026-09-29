import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/dashboard/FilterBar';
import { KpiCards } from './components/dashboard/KpiCards';
import { SalesTrendChart } from './components/dashboard/SalesTrendChart';
import { RegionalSalesChart } from './components/dashboard/RegionalSalesChart';
import { TopProductsChart } from './components/dashboard/TopProductsChart';
import { CategoryDonutChart } from './components/dashboard/CategoryDonutChart';
import { MonthlyClusteredChart } from './components/dashboard/MonthlyClusteredChart';
import { OrderDataTable } from './components/dashboard/OrderDataTable';
import { ProductDrillModal } from './components/dashboard/ProductDrillModal';
import { CaseStudySection } from './components/portfolio/CaseStudySection';
import { DataSchemaSection } from './components/portfolio/DataSchemaSection';
import { BiFormulasSection } from './components/portfolio/BiFormulasSection';
import { KeyInsightsSection } from './components/portfolio/KeyInsightsSection';
import { FiverrLinkedInKit } from './components/portfolio/FiverrLinkedInKit';
import { INITIAL_ORDERS } from './data/mockSalesData';
import { FilterState, BiTool, KpiMetrics, RegionId, CategoryName } from './types/dashboard';
import { PORTFOLIO_METADATA } from './data/portfolioContent';
import { BarChart3, Database, FileSpreadsheet, Sparkles, SlidersHorizontal, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  dateRange: 'all',
  region: 'all',
  category: 'all',
  product: 'all',
  segment: 'all',
  searchQuery: ''
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'casestudy' | 'schema' | 'recipes' | 'insights' | 'fiverr'>('dashboard');
  const [biTool, setBiTool] = useState<BiTool>('powerbi');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Filter orders based on active slicers
  const filteredOrders = useMemo(() => {
    return INITIAL_ORDERS.filter(order => {
      // 1. Date Range
      if (filters.dateRange === '2024' && order.year !== 2024) return false;
      if (filters.dateRange === '2023' && order.year !== 2023) return false;
      if (filters.dateRange === 'q1' && (order.month < 1 || order.month > 3)) return false;
      if (filters.dateRange === 'q2' && (order.month < 4 || order.month > 6)) return false;
      if (filters.dateRange === 'q3' && (order.month < 7 || order.month > 9)) return false;
      if (filters.dateRange === 'q4' && (order.month < 10 || order.month > 12)) return false;
      if (filters.dateRange === 'last30') {
        // approximate recent month
        if (order.year !== 2024 || order.month !== 12) return false;
      }

      // 2. Region
      if (filters.region !== 'all' && order.region !== filters.region) return false;

      // 3. Category
      if (filters.category !== 'all' && order.category !== filters.category) return false;

      // 4. Product
      if (filters.product !== 'all' && order.productName !== filters.product) return false;

      // 5. Segment
      if (filters.segment !== 'all' && order.segment !== filters.segment) return false;

      return true;
    });
  }, [filters]);

  // Compute live KPI metrics
  const kpiMetrics: KpiMetrics = useMemo(() => {
    // Current period vs Prior period (2024 vs 2023)
    const currentOrders = filteredOrders.filter(o => o.year === 2024);
    const priorOrders = filteredOrders.filter(o => o.year === 2023);

    const totalSales = currentOrders.reduce((sum, o) => sum + o.netSales, 0);
    const priorSales = priorOrders.reduce((sum, o) => sum + o.netSales, 0);
    const salesGrowthPct = priorSales > 0 ? ((totalSales - priorSales) / priorSales) * 100 : 14.2;
    const targetSales = priorSales > 0 ? priorSales * 1.14 : totalSales * 1.05;
    const salesVsTargetPct = targetSales > 0 ? Math.round((totalSales / targetSales) * 100) : 98;

    const totalOrdersCount = currentOrders.length;
    const priorOrdersCount = priorOrders.length;
    const ordersGrowthPct = priorOrdersCount > 0 ? ((totalOrdersCount - priorOrdersCount) / priorOrdersCount) * 100 : 8.6;
    const targetOrders = Math.round(priorOrdersCount * 1.1) || totalOrdersCount;

    const averageOrderValue = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 0;
    const priorAov = priorOrdersCount > 0 ? priorSales / priorOrdersCount : 0;
    const aovGrowthPct = priorAov > 0 ? ((averageOrderValue - priorAov) / priorAov) * 100 : 5.1;
    const targetAov = priorAov > 0 ? priorAov * 1.06 : 150.0;

    const totalProfit = currentOrders.reduce((sum, o) => sum + o.profit, 0);
    const priorProfit = priorOrders.reduce((sum, o) => sum + o.profit, 0);
    const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
    const priorProfitMargin = priorSales > 0 ? (priorProfit / priorSales) * 100 : 26.0;
    const marginGrowthPoints = profitMargin - priorProfitMargin;
    const targetProfitMargin = 28.0;

    return {
      totalSales: totalSales || filteredOrders.reduce((s, o) => s + o.netSales, 0),
      priorSales: priorSales || totalSales * 0.88,
      salesGrowthPct,
      targetSales,
      salesVsTargetPct,

      totalOrders: totalOrdersCount || filteredOrders.length,
      priorOrders: priorOrdersCount || totalOrdersCount,
      ordersGrowthPct,
      targetOrders,

      averageOrderValue,
      priorAov,
      aovGrowthPct,
      targetAov,

      profitMargin,
      priorProfitMargin,
      marginGrowthPoints,
      totalProfit,
      targetProfitMargin
    };
  }, [filteredOrders]);

  // CSV Exporter
  const handleExportCsv = () => {
    const headers = [
      'Order_ID', 'Order_Number', 'Date', 'Customer_ID', 'Customer_Name',
      'Segment', 'Region_ID', 'Region_Name', 'Country', 'Category',
      'Sub_Category', 'Product_Name', 'SKU', 'Quantity', 'Unit_Price',
      'Discount_Rate', 'Gross_Sales', 'Discount_Amount', 'Net_Sales',
      'COGS', 'Profit', 'Profit_Margin_Pct', 'Payment_Method'
    ];

    const rows = filteredOrders.map(r => [
      r.id,
      r.orderNumber,
      r.orderDate,
      r.customerId,
      `"${r.customerName}"`,
      `"${r.segment}"`,
      r.region,
      `"${r.regionName}"`,
      `"${r.country}"`,
      `"${r.category}"`,
      `"${r.subCategory}"`,
      `"${r.productName}"`,
      r.sku,
      r.quantity,
      r.unitPrice.toFixed(2),
      r.discountRate.toFixed(2),
      r.grossSales.toFixed(2),
      r.discountAmount.toFixed(2),
      r.netSales.toFixed(2),
      r.cogs.toFixed(2),
      r.profit.toFixed(2),
      r.profitMargin.toFixed(1),
      `"${r.paymentMethod}"`
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sales_performance_${filters.dateRange}_${filters.region}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        biTool={biTool}
        setBiTool={setBiTool}
        onExportCsv={handleExportCsv}
        filteredCount={filteredOrders.length}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* TAB 1: LIVE INTERACTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top Project Narrative Kicker */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/src/assets/images/analyst_portfolio_avatar_1790667975295.jpg"
                  alt="Lead Data Analyst"
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/50 shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono">
                    <span>EXECUTIVE BI SUITE</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold">Active Engine: {biTool.toUpperCase()} SPEC</span>
                  </div>
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {PORTFOLIO_METADATA.projectTitle}
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live data model tracking $1.84M in omnichannel sales across North America, Europe, Asia-Pacific & Latin America.
                  </p>
                </div>
              </div>

              {/* Quick Tab Switcher Pills */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('casestudy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
                >
                  Read Portfolio Write-up
                </button>
                <button
                  onClick={() => setActiveTab('schema')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
                >
                  View Star Schema
                </button>
              </div>
            </div>

            {/* Slicers & Context Filters */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              totalCount={INITIAL_ORDERS.length}
              filteredCount={filteredOrders.length}
            />

            {/* Visual 1: 4 Primary KPI Cards */}
            <KpiCards metrics={kpiMetrics} biTool={biTool} />

            {/* Visual 2 & Visual 5 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visual 2: Sales Trend Line Chart (7 cols) */}
              <div className="lg:col-span-7">
                <SalesTrendChart orders={filteredOrders} />
              </div>

              {/* Visual 5: Sales by Category Donut Chart (5 cols) */}
              <div className="lg:col-span-5">
                <CategoryDonutChart
                  orders={filteredOrders}
                  selectedCategory={filters.category}
                  onSelectCategory={(cat) => setFilters(prev => ({ ...prev, category: cat, product: 'all' }))}
                />
              </div>
            </div>

            {/* Visual 3 & Visual 4 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visual 3: Sales by Region (5 cols) */}
              <div className="lg:col-span-5">
                <RegionalSalesChart
                  orders={filteredOrders}
                  selectedRegion={filters.region}
                  onSelectRegion={(reg) => setFilters(prev => ({ ...prev, region: reg }))}
                />
              </div>

              {/* Visual 4: Top 10 Products by Revenue (7 cols) */}
              <div className="lg:col-span-7">
                <TopProductsChart
                  orders={filteredOrders}
                  onProductClick={(productName) => setSelectedProduct(productName)}
                />
              </div>
            </div>

            {/* Visual 6: Monthly Comparison (Clustered Column Chart) */}
            <MonthlyClusteredChart orders={filteredOrders} />

            {/* Visual 7: Fact_Sales Transaction Table */}
            <OrderDataTable
              orders={filteredOrders}
              onProductClick={(productName) => setSelectedProduct(productName)}
            />

            {/* Visual 8: Interactive Drill-Through Dossier Modal */}
            <ProductDrillModal
              productName={selectedProduct}
              orders={filteredOrders}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        )}

        {/* TAB 2: DETAILED PORTFOLIO CASE STUDY */}
        {activeTab === 'casestudy' && <CaseStudySection />}

        {/* TAB 3: DATASET STRUCTURE & STAR SCHEMA */}
        {activeTab === 'schema' && <DataSchemaSection />}

        {/* TAB 4: BI RECIPES & FORMULAS */}
        {activeTab === 'recipes' && <BiFormulasSection />}

        {/* TAB 5: KEY INSIGHTS & INTERACTIVITY GUIDE */}
        {activeTab === 'insights' && <KeyInsightsSection />}

        {/* TAB 6: FIVERR & LINKEDIN PORTFOLIO KIT */}
        {activeTab === 'fiverr' && <FiverrLinkedInKit />}

      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">Sales Performance BI Portfolio</span>
            <span>·</span>
            <span>Kimball Dimensional Model</span>
            <span>·</span>
            <span className="font-mono text-indigo-400">Power BI / Tableau / Looker Ready</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('schema')}
              className="hover:text-slate-200 transition-colors"
            >
              Data Dictionary
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className="hover:text-slate-200 transition-colors"
            >
              DAX & LOD Formulas
            </button>
            <button
              onClick={handleExportCsv}
              className="hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
