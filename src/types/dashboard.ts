export type RegionId = 'NA' | 'EU' | 'APAC' | 'LATAM';

export type CategoryName = 'Technology & Electronics' | 'Home & Living' | 'Fashion & Apparel' | 'Beauty & Personal Care';

export type CustomerSegment = 'Consumer (B2C)' | 'Corporate (B2B)' | 'Home Office';

export interface OrderItem {
  id: string;
  orderNumber: string;
  orderDate: string; // YYYY-MM-DD
  year: number;
  month: number; // 1-12
  monthName: string;
  dayOfWeek: string;
  customerName: string;
  customerId: string;
  segment: CustomerSegment;
  region: RegionId;
  regionName: string;
  country: string;
  city: string;
  category: CategoryName;
  subCategory: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discountRate: number; // 0.0 to 0.3
  grossSales: number;
  discountAmount: number;
  netSales: number;
  cogs: number; // Cost of goods sold
  profit: number;
  profitMargin: number; // percentage (0 - 100)
  shippingCost: number;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Apple Pay';
}

export interface KpiMetrics {
  totalSales: number;
  priorSales: number;
  salesGrowthPct: number;
  targetSales: number;
  salesVsTargetPct: number;

  totalOrders: number;
  priorOrders: number;
  ordersGrowthPct: number;
  targetOrders: number;

  averageOrderValue: number;
  priorAov: number;
  aovGrowthPct: number;
  targetAov: number;

  profitMargin: number;
  priorProfitMargin: number;
  marginGrowthPoints: number;
  totalProfit: number;
  targetProfitMargin: number;
}

export interface FilterState {
  dateRange: 'all' | 'last30' | 'q1' | 'q2' | 'q3' | 'q4' | '2024' | '2023';
  customStartDate?: string;
  customEndDate?: string;
  region: RegionId | 'all';
  category: CategoryName | 'all';
  product: string | 'all';
  segment: CustomerSegment | 'all';
  searchQuery: string;
}

export type BiTool = 'powerbi' | 'tableau' | 'looker';

export interface TableColumnDef {
  name: string;
  type: string;
  sample: string;
  description: string;
  isKey?: boolean;
}

export interface SchemaTableDef {
  tableName: string;
  tableType: 'Fact' | 'Dimension';
  description: string;
  rowCount: string;
  columns: TableColumnDef[];
}
