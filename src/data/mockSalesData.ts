import { OrderItem, RegionId, CategoryName, CustomerSegment } from '../types/dashboard';

export interface ProductCatalogItem {
  name: string;
  category: CategoryName;
  subCategory: string;
  sku: string;
  basePrice: number;
  baseCost: number;
}

export const PRODUCTS_CATALOG: ProductCatalogItem[] = [
  // Technology & Electronics
  { name: 'Noise-Canceling Wireless Headphones X9', category: 'Technology & Electronics', subCategory: 'Audio & Wearables', sku: 'TEC-AUD-101', basePrice: 249.99, baseCost: 145.00 },
  { name: 'Ultra-Slim Mechanical Keyboard RGB', category: 'Technology & Electronics', subCategory: 'Computer Peripherals', sku: 'TEC-KB-204', basePrice: 129.50, baseCost: 72.00 },
  { name: '4K USB-C Studio Monitor 27"', category: 'Technology & Electronics', subCategory: 'Monitors & Displays', sku: 'TEC-MON-502', basePrice: 489.00, baseCost: 310.00 },
  { name: 'Thunderbolt 4 Multi-Port Docking Hub', category: 'Technology & Electronics', subCategory: 'Accessories', sku: 'TEC-DCK-881', basePrice: 179.00, baseCost: 98.00 },
  { name: 'Smart Fitness Watch Series 5 Pro', category: 'Technology & Electronics', subCategory: 'Audio & Wearables', sku: 'TEC-WTC-309', basePrice: 299.00, baseCost: 185.00 },
  { name: 'True Wireless Earbuds Pro Active', category: 'Technology & Electronics', subCategory: 'Audio & Wearables', sku: 'TEC-EAR-774', basePrice: 159.00, baseCost: 88.00 },
  { name: 'MagSafe Wireless 3-in-1 Charging Stand', category: 'Technology & Electronics', subCategory: 'Accessories', sku: 'TEC-CHG-115', basePrice: 89.00, baseCost: 42.00 },

  // Home & Living
  { name: 'Ergonomic Memory Foam Office Chair', category: 'Home & Living', subCategory: 'Office Furniture', sku: 'HOM-CHR-901', basePrice: 349.00, baseCost: 210.00 },
  { name: 'Electric Dual-Motor Standing Desk Frame', category: 'Home & Living', subCategory: 'Office Furniture', sku: 'HOM-DSK-410', basePrice: 420.00, baseCost: 260.00 },
  { name: 'Smart Ambient LED Floor Lamp', category: 'Home & Living', subCategory: 'Lighting', sku: 'HOM-LMP-108', basePrice: 119.00, baseCost: 62.00 },
  { name: 'Aroma Ultrasonic Diffuser & Humidifier', category: 'Home & Living', subCategory: 'Home Wellness', sku: 'HOM-DIF-233', basePrice: 59.99, baseCost: 26.00 },
  { name: 'Minimalist Ceramic Pour-Over Kettle Set', category: 'Home & Living', subCategory: 'Kitchen & Dining', sku: 'HOM-KTL-602', basePrice: 79.50, baseCost: 38.00 },
  { name: 'Organic Bamboo Weighted Blanket 15lbs', category: 'Home & Living', subCategory: 'Bedding', sku: 'HOM-BLN-551', basePrice: 139.00, baseCost: 74.00 },

  // Fashion & Apparel
  { name: 'Waterproof Commuter Backpack 24L', category: 'Fashion & Apparel', subCategory: 'Bags & Luggage', sku: 'FAS-BAG-882', basePrice: 119.00, baseCost: 52.00 },
  { name: 'Merino Wool Blend Crewneck Sweater', category: 'Fashion & Apparel', subCategory: 'Knitwear', sku: 'FAS-SWT-304', basePrice: 95.00, baseCost: 48.00 },
  { name: 'Tailored Technical Stretch Chino Pants', category: 'Fashion & Apparel', subCategory: 'Bottoms', sku: 'FAS-PNT-119', basePrice: 88.00, baseCost: 39.00 },
  { name: 'All-Weather Packable Hooded Parka', category: 'Fashion & Apparel', subCategory: 'Outerwear', sku: 'FAS-JKT-720', basePrice: 185.00, baseCost: 95.00 },
  { name: 'Responsive Cushioning Trainer Sneakers', category: 'Fashion & Apparel', subCategory: 'Footwear', sku: 'FAS-SHS-991', basePrice: 145.00, baseCost: 75.00 },

  // Beauty & Personal Care
  { name: 'Hydrating Hyaluronic Botanical Serum', category: 'Beauty & Personal Care', subCategory: 'Skincare', sku: 'BTY-SRM-401', basePrice: 48.00, baseCost: 18.00 },
  { name: 'Sonic Micro-Vibration Facial Cleanser', category: 'Beauty & Personal Care', subCategory: 'Beauty Devices', sku: 'BTY-DEV-882', basePrice: 99.00, baseCost: 42.00 },
  { name: 'Organic Peptide Firming Night Cream', category: 'Beauty & Personal Care', subCategory: 'Skincare', sku: 'BTY-CRM-223', basePrice: 62.00, baseCost: 24.00 },
  { name: 'SPF 50 Mineral Defense Fluid Sunscreen', category: 'Beauty & Personal Care', subCategory: 'Sun Care', sku: 'BTY-SPF-114', basePrice: 38.00, baseCost: 14.00 }
];

export const REGIONS: { id: RegionId; name: string; country: string; defaultCity: string; salesShareWeight: number }[] = [
  { id: 'NA', name: 'North America', country: 'United States', defaultCity: 'Seattle, WA', salesShareWeight: 0.44 },
  { id: 'EU', name: 'Europe', country: 'Germany', defaultCity: 'Berlin', salesShareWeight: 0.28 },
  { id: 'APAC', name: 'Asia-Pacific', country: 'Japan', defaultCity: 'Tokyo', salesShareWeight: 0.18 },
  { id: 'LATAM', name: 'Latin America', country: 'Brazil', defaultCity: 'São Paulo', salesShareWeight: 0.10 }
];

const CUSTOMER_NAMES = [
  'Aria Montgomery', 'Liam Chen', 'Sophia Martinez', 'Marcus Vance', 'Elena Rostova',
  'David Kim', 'Zoe Washington', 'Lucas Dupont', 'Priya Patel', 'Oliver Jensen',
  'Maya Lin', 'Gabriel Santos', 'Emma Wilson', 'Alexander Wright', 'Hanna Becker',
  'Kenji Takahashi', 'Isabella Morales', 'Noah Bennett', 'Amina El-Sayed', 'Julian Rossi',
  'Chloe Dubois', 'Siddharth Rao', 'Camila Fernandez', 'Leo Johansson', 'Valerie King'
];

const SEGMENTS: CustomerSegment[] = ['Consumer (B2C)', 'Corporate (B2B)', 'Home Office'];
const PAYMENT_METHODS: ('Credit Card' | 'PayPal' | 'Bank Transfer' | 'Apple Pay')[] = ['Credit Card', 'PayPal', 'Bank Transfer', 'Apple Pay'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Seeded pseudorandom generator for deterministic, reliable sample data
function createRng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateSalesData(): OrderItem[] {
  const rng = createRng(42891);
  const items: OrderItem[] = [];

  // Generate orders across 2023 and 2024
  let orderSeq = 10001;

  for (let year of [2023, 2024]) {
    // 2024 has ~20% more sales volume than 2023
    const baseOrdersPerMonth = year === 2024 ? 36 : 28;

    for (let month = 1; month <= 12; month++) {
      // Holiday seasonality weighting: Q4 has heavy bump (Nov Black Friday, Dec Xmas), Q3 back-to-school
      let seasonality = 1.0;
      if (month === 11) seasonality = 1.65; // Black Friday / Cyber Monday
      if (month === 12) seasonality = 1.55; // Holiday Gift Rush
      if (month === 10) seasonality = 1.15;
      if (month === 7) seasonality = 1.10; // Summer Prime/Mid-year
      if (month === 1) seasonality = 0.85; // Post-holiday dip
      if (month === 2) seasonality = 0.88;

      const orderCount = Math.round(baseOrdersPerMonth * seasonality + (rng() * 8 - 4));

      for (let i = 0; i < orderCount; i++) {
        const day = Math.min(28, Math.floor(rng() * 28) + 1);
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = DAYS[dateObj.getDay()];

        // Pick product with weighted distribution
        const productIdx = Math.floor(rng() * PRODUCTS_CATALOG.length);
        const prod = PRODUCTS_CATALOG[productIdx];

        // Pick Region
        const regRand = rng();
        let region = REGIONS[0];
        if (regRand < 0.44) region = REGIONS[0]; // NA
        else if (regRand < 0.72) region = REGIONS[1]; // EU
        else if (regRand < 0.90) region = REGIONS[2]; // APAC
        else region = REGIONS[3]; // LATAM

        // Quantity: mostly 1 or 2, rarely 3-5 for B2B
        const isB2B = rng() < 0.22;
        const segment: CustomerSegment = isB2B ? 'Corporate (B2B)' : (rng() < 0.35 ? 'Home Office' : 'Consumer (B2C)');
        const quantity = isB2B ? Math.floor(rng() * 4) + 2 : (rng() < 0.15 ? 2 : 1);

        // Discount: seasonal or random
        let discountRate = 0;
        if (month === 11 || month === 12) {
          discountRate = rng() < 0.65 ? (Math.round((0.1 + rng() * 0.15) * 100) / 100) : 0;
        } else if (rng() < 0.28) {
          discountRate = Math.round((0.05 + rng() * 0.1) * 100) / 100;
        }

        const grossSales = Math.round(prod.basePrice * quantity * 100) / 100;
        const discountAmount = Math.round(grossSales * discountRate * 100) / 100;
        const netSales = Math.round((grossSales - discountAmount) * 100) / 100;
        const cogs = Math.round(prod.baseCost * quantity * 100) / 100;
        const shippingCost = Math.round((8 + rng() * 14) * 100) / 100;
        const profit = Math.round((netSales - cogs - (shippingCost * 0.4)) * 100) / 100;
        const profitMargin = Math.round((profit / (netSales || 1)) * 1000) / 10;

        const customerName = CUSTOMER_NAMES[Math.floor(rng() * CUSTOMER_NAMES.length)];
        const customerId = `CUST-${(Math.floor(rng() * 900) + 100)}`;
        const paymentMethod = PAYMENT_METHODS[Math.floor(rng() * PAYMENT_METHODS.length)];

        items.push({
          id: `ORD-${orderSeq}`,
          orderNumber: `SO-${year}-${orderSeq}`,
          orderDate: dateStr,
          year,
          month,
          monthName: MONTH_NAMES[month - 1],
          dayOfWeek,
          customerName,
          customerId,
          segment,
          region: region.id,
          regionName: region.name,
          country: region.country,
          city: region.defaultCity,
          category: prod.category,
          subCategory: prod.subCategory,
          productName: prod.name,
          sku: prod.sku,
          quantity,
          unitPrice: prod.basePrice,
          discountRate,
          grossSales,
          discountAmount,
          netSales,
          cogs,
          profit,
          profitMargin,
          shippingCost,
          paymentMethod
        });

        orderSeq++;
      }
    }
  }

  return items;
}

export const INITIAL_ORDERS: OrderItem[] = generateSalesData();

// Monthly targets reference (for clustered column chart and budget tracking)
export interface MonthlyBenchmark {
  month: number;
  monthName: string;
  actual2024: number;
  prior2023: number;
  budget2024: number;
  targetProfitMargin: number;
}

export function computeMonthlyBenchmarks(orders: OrderItem[]): MonthlyBenchmark[] {
  return MONTH_NAMES.map((name, idx) => {
    const monthNum = idx + 1;
    const orders2024 = orders.filter(o => o.year === 2024 && o.month === monthNum);
    const orders2023 = orders.filter(o => o.year === 2023 && o.month === monthNum);

    const actual2024 = Math.round(orders2024.reduce((acc, cur) => acc + cur.netSales, 0));
    const prior2023 = Math.round(orders2023.reduce((acc, cur) => acc + cur.netSales, 0));
    // Target is typically 12-15% above prior year
    const budget2024 = Math.round(prior2023 * 1.14);

    return {
      month: monthNum,
      monthName: name,
      actual2024,
      prior2023,
      budget2024,
      targetProfitMargin: 28.0
    };
  });
}
