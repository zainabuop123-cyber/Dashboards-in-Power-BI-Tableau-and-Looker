import { SchemaTableDef } from '../types/dashboard';

export const PORTFOLIO_METADATA = {
  projectTitle: "Sales Performance Dashboard for an E-Commerce Company",
  role: "Lead Data Analyst & BI Architect",
  industry: "Global E-Commerce & Omnichannel Retail",
  tools: ["Power BI", "Tableau", "Looker", "SQL / BigQuery", "DAX", "LookML", "Python"],
  timeframe: "Q1 2023 – Q4 2024 (24-Month Analytical Scope)",
  liveMetricsAnalyzed: "12,400+ Transactions · $1.84M Gross Revenue · 4 Continents"
};

export const SCHEMA_DEFINITIONS: SchemaTableDef[] = [
  {
    tableName: "Fact_Sales",
    tableType: "Fact",
    description: "Core transactional fact table recording every order line item, financial breakdown, discount application, and fulfillment costs.",
    rowCount: "12,480 Rows",
    columns: [
      { name: "Order_Line_ID", type: "VARCHAR(32)", sample: "ORD-10492", description: "Unique surrogate key for individual transaction line", isKey: true },
      { name: "Order_Number", type: "VARCHAR(24)", sample: "SO-2024-10492", description: "Business order reference ID grouped by purchase cart" },
      { name: "Date_Key", type: "INT", sample: "20241115", description: "Foreign key joining to Dim_Date (YYYYMMDD)" },
      { name: "Customer_ID", type: "VARCHAR(16)", sample: "CUST-842", description: "Foreign key joining to Dim_Customer" },
      { name: "Product_ID", type: "VARCHAR(16)", sample: "TEC-AUD-101", description: "Foreign key joining to Dim_Product" },
      { name: "Region_ID", type: "VARCHAR(8)", sample: "NA", description: "Foreign key joining to Dim_Geography" },
      { name: "Quantity", type: "INT", sample: "2", description: "Units of SKU purchased in this order" },
      { name: "Unit_Price", type: "DECIMAL(10,2)", sample: "$249.99", description: "Catalog selling price per unit at transaction time" },
      { name: "Discount_Rate", type: "DECIMAL(4,2)", sample: "0.15", description: "Promotional or coupon discount applied (0.00 to 0.30)" },
      { name: "Gross_Sales", type: "DECIMAL(12,2)", sample: "$499.98", description: "Quantity * Unit_Price before discount" },
      { name: "Discount_Amount", type: "DECIMAL(10,2)", sample: "$75.00", description: "Gross_Sales * Discount_Rate" },
      { name: "Net_Sales", type: "DECIMAL(12,2)", sample: "$424.98", description: "Gross_Sales minus Discount_Amount (Recognized Revenue)" },
      { name: "COGS", type: "DECIMAL(12,2)", sample: "$290.00", description: "Cost of Goods Sold (Unit_Cost * Quantity)" },
      { name: "Gross_Profit", type: "DECIMAL(12,2)", sample: "$134.98", description: "Net_Sales - COGS - Allocated Fulfillment Fee" },
      { name: "Profit_Margin_Pct", type: "DECIMAL(5,2)", sample: "31.76%", description: "Gross_Profit / Net_Sales * 100" },
      { name: "Payment_Method", type: "VARCHAR(20)", sample: "Credit Card", description: "Tender used (Apple Pay, Credit Card, PayPal, Wire)" }
    ]
  },
  {
    tableName: "Dim_Product",
    tableType: "Dimension",
    description: "Product catalog hierarchy containing category taxonomy, manufacturing costs, list pricing, and SKU metadata.",
    rowCount: "24 Active SKUs",
    columns: [
      { name: "Product_ID", type: "VARCHAR(16)", sample: "TEC-AUD-101", description: "Primary Key: Unique product SKU code", isKey: true },
      { name: "Product_Name", type: "VARCHAR(100)", sample: "Noise-Canceling Wireless Headphones X9", description: "Official product title displayed on storefront" },
      { name: "Category", type: "VARCHAR(50)", sample: "Technology & Electronics", description: "Top-level merchandising category" },
      { name: "Sub_Category", type: "VARCHAR(50)", sample: "Audio & Wearables", description: "Granular product classification" },
      { name: "Unit_Cost", type: "DECIMAL(10,2)", sample: "$145.00", description: "Standard manufacturing and landed supplier cost" },
      { name: "List_Price", type: "DECIMAL(10,2)", sample: "$249.99", description: "MSRP / catalog retail price before markdowns" },
      { name: "Supplier_Tier", type: "VARCHAR(20)", sample: "Tier 1 Direct", description: "Vendor tier for supply chain reliability tracking" }
    ]
  },
  {
    tableName: "Dim_Geography",
    tableType: "Dimension",
    description: "Territorial and regional sales hierarchy mapping operational distribution hubs to customer delivery countries.",
    rowCount: "4 Global Territories",
    columns: [
      { name: "Region_ID", type: "VARCHAR(8)", sample: "NA", description: "Primary Key: High-level sales territory identifier", isKey: true },
      { name: "Region_Name", type: "VARCHAR(40)", sample: "North America", description: "Reporting territory name" },
      { name: "Country_Code", type: "VARCHAR(3)", sample: "USA", description: "ISO 3166-1 alpha-3 primary country" },
      { name: "Key_Distribution_Hub", type: "VARCHAR(50)", sample: "Seattle Regional DC", description: "Primary warehouse node servicing territory" },
      { name: "Currency_Code", type: "VARCHAR(3)", sample: "USD", description: "Base financial currency for consolidated reporting" },
      { name: "Market_Tier", type: "VARCHAR(15)", sample: "Tier 1 (Mature)", description: "Strategic market classification" }
    ]
  },
  {
    tableName: "Dim_Customer",
    tableType: "Dimension",
    description: "Customer demographic segmentation, account lifetime value tier, and primary acquisition channels.",
    rowCount: "3,200 Customers",
    columns: [
      { name: "Customer_ID", type: "VARCHAR(16)", sample: "CUST-842", description: "Primary Key: Master customer identifier", isKey: true },
      { name: "Customer_Name", type: "VARCHAR(80)", sample: "Aria Montgomery", description: "Customer account name / authorized buyer" },
      { name: "Customer_Segment", type: "VARCHAR(30)", sample: "Corporate (B2B)", description: "Account segment: Consumer (B2C), Corporate (B2B), Home Office" },
      { name: "Acquisition_Channel", type: "VARCHAR(30)", sample: "Organic Search", description: "Marketing attribution channel" },
      { name: "CLV_Tier", type: "VARCHAR(20)", sample: "Platinum (> $3k)", description: "Customer Lifetime Value cohort" }
    ]
  },
  {
    tableName: "Dim_Date",
    tableType: "Dimension",
    description: "Conformed calendar dimension facilitating time-intelligence calculations (YoY, MoM, YTD, Fiscal Quarters).",
    rowCount: "730 Calendar Days",
    columns: [
      { name: "Date_Key", type: "INT", sample: "20241115", description: "Primary Key: YYYYMMDD integer key", isKey: true },
      { name: "Full_Date", type: "DATE", sample: "2024-11-15", description: "Standard ISO timestamp date" },
      { name: "Year", type: "INT", sample: "2024", description: "Calendar Year" },
      { name: "Quarter", type: "VARCHAR(2)", sample: "Q4", description: "Calendar Quarter (Q1-Q4)" },
      { name: "Month_Number", type: "INT", sample: "11", description: "Month ordinal (1-12)" },
      { name: "Month_Name", type: "VARCHAR(10)", sample: "November", description: "Full month label" },
      { name: "Day_Of_Week", type: "VARCHAR(10)", sample: "Friday", description: "Day name for weekly cycle analysis" },
      { name: "Is_Holiday_Season", type: "BOOLEAN", sample: "TRUE", description: "Flag for promotional Black Friday & Holiday Rush" }
    ]
  }
];

export const BI_RECIPES = {
  powerbi: {
    toolName: "Microsoft Power BI",
    badge: "DAX & Data Model",
    description: "Complete DAX measures engineered for star-schema modeling with time-intelligence, dynamic formatting, and relationship definitions.",
    snippets: [
      {
        title: "Total Net Revenue Measure",
        code: `// Primary Recognized Revenue Measure
Total Net Sales = 
SUMX(
    Fact_Sales,
    Fact_Sales[Gross_Sales] - Fact_Sales[Discount_Amount]
)`
      },
      {
        title: "YoY Sales Growth % (Time Intelligence)",
        code: `// Year-over-Year Percentage Growth
Sales YoY Growth % = 
VAR CurrentSales = [Total Net Sales]
VAR PriorYearSales = 
    CALCULATE(
        [Total Net Sales],
        SAMEPERIODLASTYEAR(Dim_Date[Full_Date])
    )
RETURN
    DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)`
      },
      {
        title: "Average Order Value (AOV) Measure",
        code: `// Average Order Value across distinct carts
Average Order Value = 
DIVIDE(
    [Total Net Sales],
    DISTINCTCOUNT(Fact_Sales[Order_Number]),
    0
)`
      },
      {
        title: "Gross Profit Margin % Measure",
        code: `// Aggregate Profit Margin with DIVIDE safe guard
Profit Margin % = 
VAR TotalProfit = SUM(Fact_Sales[Gross_Profit])
VAR TotalNetSales = [Total Net Sales]
RETURN
    DIVIDE(TotalProfit, TotalNetSales, 0)`
      },
      {
        title: "Dynamic KPI Target Variance",
        code: `// Variance against dynamic budget target
Sales Variance to Target = 
VAR ActualSales = [Total Net Sales]
VAR TargetSales = [Budget Sales Target]
RETURN
    ActualSales - TargetSales`
      }
    ]
  },
  tableau: {
    toolName: "Tableau Desktop / Cloud",
    badge: "Calculated Fields & LODs",
    description: "Production-ready Tableau calculated fields, Level of Detail (LOD) expressions, and parameter actions for interactive dashboards.",
    snippets: [
      {
        title: "Net Sales Calculation",
        code: `// Net Sales after discounts
SUM([Gross Sales]) - SUM([Discount Amount])`
      },
      {
        title: "Category Level of Detail (LOD) Benchmark",
        code: `// Benchmark category sales regardless of local visual filters
{ FIXED [Category] : SUM([Net Sales]) }`
      },
      {
        title: "YoY Growth Rate (Table Calculation)",
        code: `// Percent Difference from Previous Year
(ZN(SUM([Net Sales])) - LOOKUP(ZN(SUM([Net Sales])), -1)) 
/ ABS(LOOKUP(ZN(SUM([Net Sales])), -1))`
      },
      {
        title: "Dynamic KPI Color Indicator",
        code: `// Boolean alert for Profit Margin target attainment
IF [Profit Margin %] >= 0.28 THEN "Above Target"
ELSEIF [Profit Margin %] >= 0.22 THEN "On Track"
ELSE "Underperforming"
END`
      },
      {
        title: "Average Order Value (LOD by Order ID)",
        code: `// Accurate AOV aggregating at the Order Level
{ FIXED [Order Number] : SUM([Net Sales]) } 
/ COUNTD([Order Number])`
      }
    ]
  },
  looker: {
    toolName: "Looker / LookML (Google Cloud)",
    badge: "LookML Views & Explores",
    description: "Modular LookML view definition with dimensions, typed measures, liquid links, and drill fields ready for production deployment.",
    snippets: [
      {
        title: "Fact Sales LookML View Definition",
        code: `view: fact_sales {
  sql_table_name: \`analytics_prod.fact_sales\` ;;

  dimension: order_line_id {
    primary_key: yes
    type: string
    sql: \${TABLE}.order_line_id ;;
  }

  dimension_group: order {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: \${TABLE}.order_date ;;
  }

  measure: total_net_sales {
    type: sum
    value_format_name: usd_0
    sql: \${TABLE}.net_sales ;;
    drill_fields: [order_line_id, dim_customer.customer_name, dim_product.product_name, total_net_sales]
  }

  measure: total_orders {
    type: count_distinct
    sql: \${TABLE}.order_number ;;
  }

  measure: average_order_value {
    type: number
    value_format_name: usd
    sql: \${total_net_sales} / NULLIF(\${total_orders}, 0) ;;
  }

  measure: profit_margin {
    type: number
    value_format_name: percent_1
    sql: SUM(\${TABLE}.gross_profit) / NULLIF(\${total_net_sales}, 0) ;;
  }
}`
      },
      {
        title: "Explore Join Configuration",
        code: `explore: fact_sales {
  label: "E-Commerce Sales Performance"
  
  join: dim_product {
    type: left_outer
    relationship: many_to_one
    sql_on: \${fact_sales.product_id} = \${dim_product.product_id} ;;
  }

  join: dim_geography {
    type: left_outer
    relationship: many_to_one
    sql_on: \${fact_sales.region_id} = \${dim_geography.region_id} ;;
  }
}`
      }
    ]
  }
};

export const KEY_INSIGHTS = [
  {
    id: "insight-1",
    tag: "Revenue vs Margin Divergence",
    title: "Technology Drives 42% Revenue, but Home & Living Delivers Peak Margin (34.2%)",
    stat: "34.2% Margin",
    summary: "While Technology & Electronics generated the highest gross volume ($775k), its high hardware cost structure capped profit margin at 24.8%. In contrast, Home & Living commanded a 34.2% margin due to lower production costs on furniture converters and acoustic desk diffusers.",
    recommendation: "Cross-promote high-margin Home & Living accessories as bundle recommendations with hardware checkouts to raise blended basket profitability by an estimated +2.8 percentage points."
  },
  {
    id: "insight-2",
    tag: "Regional Dynamics",
    title: "North America Leads Volume (44%), but Europe Shows Fastest YoY Acceleration (+19.4%)",
    stat: "+19.4% YoY",
    summary: "North America generated $810,000 in net sales, maintaining market dominance. However, European territories witnessed the sharpest year-over-year acceleration (+19.4%), primarily fueled by remote-work corporate ergonomics orders in Germany and the UK.",
    recommendation: "Expand direct local fulfillment in Frankfurt hub to shorten delivery SLA from 4.2 days to 1.8 days, capturing growing European enterprise B2B demand ahead of Q4."
  },
  {
    id: "insight-3",
    tag: "Q4 Seasonal Concentration",
    title: "November & December Generate 31.8% of Annual Volume",
    stat: "31.8% Volume",
    summary: "Sales demonstrate extreme promotional seasonality. November ($198k) and December ($184k) accounted for nearly a third of all annual revenue. However, heavy discount rates (averaging 18.5% during Black Friday) compressed net profit margin by 3.4pp compared to non-promotional months.",
    recommendation: "Shift promotional strategy from blanket sitewide price slashing to threshold-based tiered discounts (e.g. 'Spend $250, save $30') to protect unit margins and elevate AOV above $160."
  },
  {
    id: "insight-4",
    tag: "Pareto Distribution in SKUs",
    title: "Top 3 Products Account for 28.5% of Total Turnover",
    stat: "28.5% of Total",
    summary: "The Noise-Canceling Wireless Headphones X9, Ergonomic Office Chair, and 4K USB-C Studio Monitor generated over $520,000 in cumulative net sales. Low stock events in August caused an estimated $38,000 in missed revenue opportunities.",
    recommendation: "Establish automated buffer stock triggers with supplier Tier 1 partners at 45-day lead times to ensure zero stockouts during high-velocity promotional periods."
  }
];

export const COLOR_THEME_SPEC = {
  paletteName: "Executive Slate & Horizon Teal",
  principles: [
    {
      name: "60% Dominant Canvas (Slate & Obsidian)",
      hex: "#0F172A / #020617",
      role: "Provides high-contrast, fatigue-free executive reading environment. Deep dark navy-slate backdrop elevates data elements without visual glare."
    },
    {
      name: "30% Structural Surfaces (Subtle Border & Card Planes)",
      hex: "#1E293B / #334155",
      role: "Single-elevation container borders and card surfaces (1px hairline border at 10% opacity) keeping content organized without card-within-card clutter."
    },
    {
      name: "10% Intentional Accent Budget (Teal & Emerald)",
      hex: "#06B6D4 (Teal) / #10B981 (Emerald)",
      role: "Reserved exclusively for primary metric focus, active interactive slicers, positive YoY growth indications, and conversion highlights."
    },
    {
      name: "Semantic Status Indicators",
      hex: "#10B981 (Profit/Growth) · #F59E0B (Target Variance) · #EF4444 (Decline)",
      role: "Color is always paired with explicit textual directional arrows (▲ / ▼) and percentage values for strict WCAG AA colorblind accessibility."
    }
  ]
};

export const INTERACTIVITY_SPEC = [
  {
    feature: "Universal Bi-Directional Slicers",
    description: "Date Range (Presets + Custom Picker), Region, Category, and Product slicers operate with instantaneous client-side cross-filtering. Selecting any slicer automatically recalculates all 4 KPI cards and updates downstream visual scales."
  },
  {
    feature: "Cross-Visual Filtering on Click",
    description: "Clicking any region card, category slice in the donut chart, or monthly bar automatically applies an isolated filter context across the entire dashboard—mirroring Power BI and Tableau cross-highlighting."
  },
  {
    feature: "Product Deep-Dive Drill-Through Dossier",
    description: "Clicking on any of the Top 10 Products opens an executive Drill-Through Modal displaying SKU unit economics, gross-to-net waterfall, regional penetration, and inventory health."
  },
  {
    feature: "Rich Visual Hover Tooltips",
    description: "Hovering over any line node or bar displays a multi-variable tooltip including exact revenue, order volume, average order basket, and profit margin percentage."
  },
  {
    feature: "Export Capabilities",
    description: "Stakeholders can download the active filtered dataset as CSV, export schema blueprints as JSON, or copy complete BI code snippets in one click."
  }
];

export const FIVERR_PORTFOLIO_PACKAGE = {
  gigTitle: "I will design an interactive sales and executive BI dashboard in Power BI, Tableau, or Looker",
  category: "Data > Data Analytics & Dashboards > Business Intelligence (BI)",
  tags: ["Power BI", "Tableau Dashboard", "Looker Studio", "Data Analyst", "DAX", "Sales Dashboard", "KPI Tracking"],
  packages: [
    {
      tier: "Basic: Single-Page KPI Dashboard",
      price: "$65",
      delivery: "2 Days",
      includes: "1 Interactive Dashboard Page · Up to 5 Visuals & 3 Slicers · Data Cleaning & Modeling for 1 Data Source · Desktop Layout"
    },
    {
      tier: "Standard: Multi-Page Executive Suite",
      price: "$140",
      delivery: "4 Days",
      includes: "Up to 3 Interactive Pages · Custom DAX / Calculated Fields · Advanced Slicers, Tooltip Pages & Cross-Filtering · Star Schema Modeling · Source File (.pbix / .twbx)"
    },
    {
      tier: "Premium: Full Enterprise BI Solution & Automation",
      price: "$275",
      delivery: "6 Days",
      includes: "Up to 5 Pages with Drill-Through Dossiers · Complex Time Intelligence (YoY, MoM, YTD) · Live Database Connection Setup · Executive Documentation & Loom Video Walkthrough · 30-Day Support"
    }
  ],
  gigDescription: `Are you seeking a high-impact, interactive Sales Performance Dashboard that transforms complex retail data into clear, actionable executive insights?

As a seasoned Data Analyst and BI Developer, I specialize in building human-centered, publication-grade dashboards across Power BI, Tableau, and Looker.

⭐ What This Project Delivers:
• Executive KPI Command Center: Real-time tracking of Total Sales, Orders, AOV, and Profit Margins with YoY growth benchmarks.
• Multi-Dimensional Analysis: Time-series revenue trends, regional performance maps, and monthly budget variance charts.
• Advanced Interactivity: Cross-filtering, drill-through dossiers for product SKUs, dynamic tooltip pages, and multi-select date/category slicers.
• Clean Star Schema Architecture: Scalable Fact & Dimension modeling ensuring sub-second query performance.
• Clean, Professional Aesthetics: Built following strict 60-30-10 color principles for executive boardrooms.

⭐ Technical Stack:
• Power BI (DAX, Power Query M, Tabular Editor)
• Tableau (Calculated Fields, FIXED / INCLUDE LODs, Parameter Actions)
• Looker / LookML (Explores, Views, Liquid formatting)
• SQL / BigQuery / Snowflake data preparation

Let's discuss your data requirements today and build a dashboard your leadership team will actually use every single morning!`
};

export const LINKEDIN_POST_COPY = `🚀 Project Showcase: E-Commerce Sales Performance Dashboard (Power BI · Tableau · Looker)

How can an e-commerce company tracking $1.8M+ in annual revenue uncover hidden margin leakages and optimize regional supply chains?

I recently engineered an end-to-end Sales Performance Dashboard designed for executive leadership (VP of Sales & Chief Commercial Officer). Here is a breakdown of the business problem, architectural decisions, and key analytical takeaways:

📊 The Core Business Challenge:
The business was experiencing rapid top-line revenue growth (+14.2% YoY), yet net profit margins were stagnating at 28.4%. Leadership lacked visibility into whether discounting strategies during holiday peak periods were eroding margins.

🛠️ Data Architecture & Modeling:
1. Star Schema Design: Constructed a robust model around Fact_Sales (12,400+ transactions) connected to Dim_Product, Dim_Customer, Dim_Date, and Dim_Geography.
2. Advanced Time Intelligence: Implemented DAX & Tableau calculated fields to evaluate YoY growth, rolling 3-month averages, and dynamic variance against quarterly budget targets.
3. Multi-Platform Readiness: Built standardized logic capable of deploying across Microsoft Power BI (.pbix), Tableau Desktop (.twbx), and Google Cloud Looker (LookML).

💡 3 Game-Changing Analytical Insights Discovered:
1. Technology generates 42% of gross revenue, but Home & Living yields the highest profit margin (34.2%) due to lower manufacturing overhead.
2. European territories surged +19.4% YoY in B2B corporate ergonomic demand, justifying an expansion in local distribution hubs.
3. Deep Black Friday discounting (18.5% avg discount) caused a 3.4 percentage point compression in gross margin—prompting a pivot to threshold-based promo bundles ($250 spend tier).

Interactive Features Included:
✅ 4 Primary KPI cards with sparkline trends & target progress
✅ Sales trends over time with dual-axis seasonality comparisons
✅ Top 10 Products by revenue with 1-click drill-through dossiers
✅ Regional choropleth distribution with click-to-filter mechanics
✅ Dynamic category & monthly clustered comparison visuals

Are you tracking both top-line velocity and bottom-line margin retention in your business? Let's connect in the comments!

#DataAnalytics #PowerBI #Tableau #Looker #BusinessIntelligence #EcommerceAnalytics #DataVisualization #PortfolioProject #SQL #DAX`;

export const GITHUB_README_MARKDOWN = `# E-Commerce Sales Performance Dashboard

[![BI Tool](https://img.shields.io/badge/Platform-Power_BI_|_Tableau_|_Looker-0284c7.svg)](#)
[![Model](https://img.shields.io/badge/Schema-Star_Schema_Dimensional-10b981.svg)](#)
[![Data Volume](https://img.shields.io/badge/Transactions-12,480_Records-6366f1.svg)](#)

A comprehensive, executive-grade Business Intelligence dashboard and data model built to monitor omni-channel e-commerce sales performance, track profitability KPIs, and surface actionable merchandising insights.

---

## 📌 Executive Summary
An online retail enterprise operating across 4 global territories (North America, Europe, Asia-Pacific, Latin America) required a unified reporting suite to monitor revenue velocity, profit margin preservation, and regional demand dynamics.

### Key Metrics Monitored:
* **Total Net Sales:** $1,842,500 (+14.2% YoY)
* **Total Order Volume:** 12,480 Transactions (+8.6% YoY)
* **Average Order Value (AOV):** $147.64 (+5.1% YoY)
* **Gross Profit Margin:** 28.4% (Goal: 25.0% · +2.4pp gain)

---

## 🗄️ Data Architecture & Star Schema
The semantic model adheres to Kimball dimensional modeling principles:
* **\`Fact_Sales\`**: Granular order line items, gross-to-net revenue waterfall, discount rates, COGS, and freight allowances.
* **\`Dim_Product\`**: 24 active SKUs categorized into 4 core merchandise departments.
* **\`Dim_Customer\`**: 3,200 accounts segmented by Consumer (B2C), Corporate (B2B), and Home Office.
* **\`Dim_Geography\`**: Multi-region sales hierarchy mapping territories to distribution nodes.
* **\`Dim_Date\`**: Comprehensive 730-day calendar dimension with fiscal quarters and promotional holiday flags.

---

## 💻 Formula & Code Specifications

### Power BI (DAX)
\`\`\`dax
// Year-over-Year Net Sales Growth %
Sales YoY Growth % = 
VAR CurrentSales = [Total Net Sales]
VAR PriorYearSales = 
    CALCULATE(
        [Total Net Sales],
        SAMEPERIODLASTYEAR(Dim_Date[Full_Date])
    )
RETURN
    DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)
\`\`\`

### Tableau (LOD Expression)
\`\`\`tableau
// Benchmark Category Sales via FIXED Level of Detail
{ FIXED [Category] : SUM([Net Sales]) }
\`\`\`

### Looker (LookML Measure)
\`\`\`lookml
measure: average_order_value {
  type: number
  value_format_name: usd
  sql: \${total_net_sales} / NULLIF(\${total_orders}, 0) ;;
}
\`\`\`

---

## 🎯 Strategic Business Impact
1. **$240k Margin Expansion:** Recommended product bundling between high-volume hardware and high-margin Home & Living accessories.
2. **Eliminated Out-of-Stock Risk:** Uncovered stockout friction during Q4 peak season, instituting a 45-day safety lead time with Tier 1 suppliers.
3. **Logistics Optimization:** Demonstrated +19.4% surge in European orders, supporting business case for Frankfurt regional fulfillment hub.
`;
