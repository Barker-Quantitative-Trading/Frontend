export interface Earnings {
  symbol: string;
  date: string;
  epsActual?: number;
  epsEstimated?: number;
  revenueActual?: number;
  revenueEstimated?: number;
  lastUpdated?: string;
}