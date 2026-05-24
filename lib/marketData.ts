import { mockChartData, mockStocks } from "@/lib/mockData";

export type MarketQuote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  high?: number;
  low?: number;
  previousClose?: number;
  open?: number;
  timestamp: string;
  provider: "finnhub" | "mock";
};

export type ChartPoint = {
  time: string;
  price: number;
};

type FinnhubQuote = {
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t?: number;
};

type FinnhubCandle = {
  c?: number[];
  t?: number[];
  s?: string;
};

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA"];

const getApiKey = () => process.env.FINNHUB_API_KEY?.trim();

const normalizeSymbol = (symbol: string) => symbol.trim().toUpperCase();

const getMockStock = (symbol: string) =>
  mockStocks.find((stock) => stock.symbol === normalizeSymbol(symbol)) ?? mockStocks[0];

const toMockQuote = (symbol: string): MarketQuote => {
  const stock = getMockStock(symbol);

  return {
    symbol: stock.symbol,
    name: stock.name,
    price: stock.price,
    change: stock.change,
    changePercent: stock.changePercent,
    marketCap: stock.marketCap,
    volume: stock.volume,
    timestamp: new Date().toISOString(),
    provider: "mock",
  };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error(`Market data request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const getMarketQuotes = async (symbols = DEFAULT_SYMBOLS): Promise<MarketQuote[]> => {
  const uniqueSymbols = Array.from(new Set(symbols.map(normalizeSymbol).filter(Boolean))).slice(0, 20);
  const apiKey = getApiKey();

  if (!apiKey) {
    return uniqueSymbols.map(toMockQuote);
  }

  try {
    const quotes = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        const stock = getMockStock(symbol);
        const params = new URLSearchParams({ symbol, token: apiKey });
        const data = await fetchJson<FinnhubQuote>(`${FINNHUB_BASE_URL}/quote?${params.toString()}`);

        if (!data.c) {
          return toMockQuote(symbol);
        }

        return {
          symbol,
          name: stock.name,
          price: data.c,
          change: data.d ?? data.c - (data.pc ?? data.c),
          changePercent: data.dp ?? 0,
          marketCap: stock.marketCap,
          volume: stock.volume,
          high: data.h,
          low: data.l,
          open: data.o,
          previousClose: data.pc,
          timestamp: data.t ? new Date(data.t * 1000).toISOString() : new Date().toISOString(),
          provider: "finnhub" as const,
        };
      })
    );

    return quotes;
  } catch (error) {
    console.warn("Falling back to mock market data:", error);
    return uniqueSymbols.map(toMockQuote);
  }
};

export const getMarketQuote = async (symbol: string): Promise<MarketQuote> => {
  const [quote] = await getMarketQuotes([symbol]);
  return quote;
};

export const getChartData = async (symbol: string): Promise<ChartPoint[]> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    return mockChartData;
  }

  const now = Math.floor(Date.now() / 1000);
  const marketDay = 60 * 60 * 8;
  const params = new URLSearchParams({
    symbol: normalizeSymbol(symbol),
    resolution: "5",
    from: String(now - marketDay),
    to: String(now),
    token: apiKey,
  });

  try {
    const data = await fetchJson<FinnhubCandle>(`${FINNHUB_BASE_URL}/stock/candle?${params.toString()}`);

    if (data.s !== "ok" || !data.c?.length || !data.t?.length) {
      return mockChartData;
    }

    return data.c.map((price, index) => ({
      price,
      time: new Date((data.t?.[index] ?? now) * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  } catch (error) {
    console.warn("Falling back to mock chart data:", error);
    return mockChartData;
  }
};

