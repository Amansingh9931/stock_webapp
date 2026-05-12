export const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.45, change: 2.50, changePercent: 1.39, marketCap: 2800000000000, volume: 50000000, trend: "up" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.33, change: -1.20, changePercent: -0.29, marketCap: 3100000000000, volume: 25000000, trend: "down" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 158.09, change: 3.20, changePercent: 2.07, marketCap: 2050000000000, volume: 30000000, trend: "up" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 191.63, change: -2.10, changePercent: -1.08, marketCap: 1900000000000, volume: 45000000, trend: "down" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 873.45, change: 15.30, changePercent: 1.78, marketCap: 2150000000000, volume: 35000000, trend: "up" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 242.84, change: -5.20, changePercent: -2.10, marketCap: 768000000000, volume: 120000000, trend: "down" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 534.67, change: 8.45, changePercent: 1.61, marketCap: 1350000000000, volume: 15000000, trend: "up" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 247.89, change: 4.50, changePercent: 1.85, marketCap: 105000000000, volume: 3000000, trend: "up" },
];

export const mockPortfolio = {
  totalValue: 125430.50,
  todayGain: 2340.75,
  todayGainPercent: 1.90,
  holdings: [
    { symbol: "AAPL", quantity: 10, purchasePrice: 150.00, currentPrice: 182.45, value: 1824.50, gain: 324.50, gainPercent: 21.63 },
    { symbol: "MSFT", quantity: 5, purchasePrice: 380.00, currentPrice: 415.33, value: 2076.65, gain: 176.65, gainPercent: 9.28 },
    { symbol: "GOOGL", quantity: 8, purchasePrice: 140.00, currentPrice: 158.09, value: 1264.72, gain: 144.72, gainPercent: 12.91 },
    { symbol: "AMZN", quantity: 20, purchasePrice: 180.00, currentPrice: 191.63, value: 3832.60, gain: 232.60, gainPercent: 6.48 },
    { symbol: "NVDA", quantity: 4, purchasePrice: 850.00, currentPrice: 873.45, value: 3493.80, gain: 93.80, gainPercent: 2.76 },
  ]
};

export const mockWatchlist = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.45, change: 2.50, changePercent: 1.39, week52High: 199.62, week52Low: 164.08, marketCap: "2.8T" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 415.33, change: -1.20, changePercent: -0.29, week52High: 426.00, week52Low: 312.38, marketCap: "3.1T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 158.09, change: 3.20, changePercent: 2.07, week52High: 191.54, week52Low: 125.31, marketCap: "2.05T" },
];

export const mockChartData = [
  { time: "09:30", price: 178.50 },
  { time: "10:00", price: 179.20 },
  { time: "10:30", price: 178.90 },
  { time: "11:00", price: 180.45 },
  { time: "11:30", price: 179.80 },
  { time: "12:00", price: 181.20 },
  { time: "12:30", price: 180.90 },
  { time: "13:00", price: 182.45 },
  { time: "13:30", price: 181.80 },
  { time: "14:00", price: 182.45 },
  { time: "14:30", price: 183.20 },
  { time: "15:00", price: 182.45 },
];

export const mockNews = [
  { id: 1, title: "Apple Reports Record Q1 Revenue", source: "Bloomberg", time: "2 hours ago", image: "https://via.placeholder.com/300x200" },
  { id: 2, title: "Microsoft to Invest $10B in AI", source: "Reuters", time: "4 hours ago", image: "https://via.placeholder.com/300x200" },
  { id: 3, title: "Tech Stocks Surge on Positive Earnings", source: "CNBC", time: "6 hours ago", image: "https://via.placeholder.com/300x200" },
];

export const mockTrendingStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.45, changePercent: 1.39, trend: "up" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 873.45, changePercent: 1.78, trend: "up" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 534.67, changePercent: 1.61, trend: "up" },
];
