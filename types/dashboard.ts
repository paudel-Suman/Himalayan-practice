export interface DashboardAnalystics {
  success: boolean;
  statusCode: string;
  message: string;
  summary: {
    totalRevenue: number;
    productsSold: number;
    growth: {
      percentage: number;
      trend: string;
    };
  };
}

interface MonthlyMetric {
  month: string;
  userCount: number;
  totalRevenue: number;
  totalCashflow: number;
}

export interface SuperadminDashboardMonthlyMetric {
  success: boolean;
  statusCode: number;
  message: string;
  metrics: MonthlyMetric[];
}
