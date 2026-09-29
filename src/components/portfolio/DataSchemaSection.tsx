import React, { useState } from 'react';
import { SCHEMA_DEFINITIONS } from '../../data/portfolioContent';
import { INITIAL_ORDERS } from '../../data/mockSalesData';
import { Database, Key, Download, Code2, Layers, Search, FileJson } from 'lucide-react';

export const DataSchemaSection: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('Fact_Sales');
  const [columnSearch, setColumnSearch] = useState('');

  const currentSchema = SCHEMA_DEFINITIONS.find(t => t.tableName === selectedTable) || SCHEMA_DEFINITIONS[0];

  const filteredColumns = currentSchema.columns.filter(c =>
    c.name.toLowerCase().includes(columnSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(columnSearch.toLowerCase()) ||
    c.type.toLowerCase().includes(columnSearch.toLowerCase())
  );

  // CSV Generator
  const downloadSampleCsv = () => {
    const sampleRows = INITIAL_ORDERS.slice(0, 100);
    const headers = [
      'Order_ID', 'Order_Number', 'Date', 'Customer_ID', 'Customer_Name',
      'Segment', 'Region_ID', 'Region_Name', 'Country', 'Category',
      'Sub_Category', 'Product_Name', 'SKU', 'Quantity', 'Unit_Price',
      'Discount_Rate', 'Gross_Sales', 'Discount_Amount', 'Net_Sales',
      'COGS', 'Profit', 'Profit_Margin_Pct', 'Payment_Method'
    ];

    const csvContent = [
      headers.join(','),
      ...sampleRows.map(r => [
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
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ecommerce_sales_dataset_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Schema Blueprint Generator
  const downloadJsonSchema = () => {
    const jsonStr = JSON.stringify(SCHEMA_DEFINITIONS, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ecommerce_bi_star_schema_blueprint.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header and Download buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-1">
            <Database className="w-4 h-4" />
            <span>DIMENSIONAL ARCHITECTURE · KIMBALL STAR SCHEMA</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            E-Commerce Data Model & Table Specifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Engineered with a high-performance Star Schema structure optimized for sub-second aggregations in Power BI VertiPaq, Tableau Hyper, and BigQuery/Looker.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={downloadSampleCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (100 Rows)</span>
          </button>
          <button
            onClick={downloadJsonSchema}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <FileJson className="w-3.5 h-3.5 text-indigo-400" />
            <span>Schema JSON</span>
          </button>
        </div>
      </div>

      {/* Visual Star Schema Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Semantic Relationship Diagram (1-to-Many Star Topology)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Dimension Left Columns */}
          <div className="space-y-4">
            <div className="p-3 bg-slate-950 rounded-lg border border-sky-800/60 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>Dim_Product</span>
                <span className="text-[10px] text-slate-500">1</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Product SKU, Category, Cost, MSRP</p>
              <div className="text-[10px] text-sky-300 font-mono mt-1">PK: Product_ID</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-sky-800/60 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>Dim_Customer</span>
                <span className="text-[10px] text-slate-500">1</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Customer Name, Segment, CLV Tier</p>
              <div className="text-[10px] text-sky-300 font-mono mt-1">PK: Customer_ID</div>
            </div>
          </div>

          {/* Central Fact Table */}
          <div className="p-5 bg-gradient-to-b from-indigo-950/80 to-slate-950 rounded-xl border-2 border-indigo-500/80 text-center shadow-md relative">
            <div className="inline-block px-2.5 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              CENTRAL FACT TABLE
            </div>
            <h3 className="text-base font-extrabold text-white font-mono">Fact_Sales</h3>
            <p className="text-xs text-indigo-200 mt-1">
              Grain: Single Order Line Item
            </p>
            <div className="text-[11px] text-slate-400 mt-2 space-y-0.5 font-mono">
              <div>FK: Product_ID · Customer_ID</div>
              <div>FK: Region_ID · Date_Key</div>
              <div className="text-emerald-400 font-bold mt-1">Measures: Net_Sales, Profit, Qty</div>
            </div>
            <div className="mt-3 text-[10px] text-slate-400 border-t border-indigo-800/60 pt-2 font-mono">
              Cardinality: Many (*)
            </div>
          </div>

          {/* Dimension Right Columns */}
          <div className="space-y-4">
            <div className="p-3 bg-slate-950 rounded-lg border border-sky-800/60 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>Dim_Geography</span>
                <span className="text-[10px] text-slate-500">1</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Territory, Country, DC Node</p>
              <div className="text-[10px] text-sky-300 font-mono mt-1">PK: Region_ID</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-sky-800/60 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400">
                <span>Dim_Date</span>
                <span className="text-[10px] text-slate-500">1</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Fiscal Calendar, YoY, Holiday Flags</p>
              <div className="text-[10px] text-sky-300 font-mono mt-1">PK: Date_Key</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Table Data Dictionary Browser */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          {/* Table Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {SCHEMA_DEFINITIONS.map(table => (
              <button
                key={table.tableName}
                onClick={() => { setSelectedTable(table.tableName); setColumnSearch(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  selectedTable === table.tableName
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {table.tableName} ({table.tableType})
              </button>
            ))}
          </div>

          {/* Search column */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={columnSearch}
              onChange={(e) => setColumnSearch(e.target.value)}
              placeholder="Search column or type..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Selected Table Metadata */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg mb-4 text-xs">
          <div className="flex items-center justify-between font-mono mb-1">
            <span className="font-bold text-indigo-400">{currentSchema.tableName}</span>
            <span className="text-slate-400">{currentSchema.rowCount}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{currentSchema.description}</p>
        </div>

        {/* Column Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
              <tr>
                <th className="py-2.5 px-3">Column Name</th>
                <th className="py-2.5 px-3">SQL / Data Type</th>
                <th className="py-2.5 px-3">Key Constraint</th>
                <th className="py-2.5 px-3">Sample Value</th>
                <th className="py-2.5 px-3">Business Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/60 font-sans">
              {filteredColumns.map(col => (
                <tr key={col.name} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-slate-200">
                    {col.name}
                  </td>
                  <td className="py-2 px-3 font-mono text-indigo-300 text-[11px]">
                    {col.type}
                  </td>
                  <td className="py-2 px-3 font-mono">
                    {col.isKey ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                        <Key className="w-2.5 h-2.5" />
                        PRIMARY KEY
                      </span>
                    ) : col.name.endsWith('_ID') || col.name.endsWith('_Key') ? (
                      <span className="text-[10px] text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800/40">
                        FOREIGN KEY
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">-</span>
                    )}
                  </td>
                  <td className="py-2 px-3 font-mono text-emerald-300 text-[11px]">
                    {col.sample}
                  </td>
                  <td className="py-2 px-3 text-slate-300 text-xs">
                    {col.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
