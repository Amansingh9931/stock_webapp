import useSWR from "swr";
import type { ChartPoint, MarketQuote } from "@/lib/marketData";

type QuotesResponse = {
  data: MarketQuote[];
  mode: "live" | "demo";
  updatedAt: string;
};

type StockResponse = {
  data: {
    quote: MarketQuote;
    chart: ChartPoint[];
  };
  mode: "live" | "demo";
  updatedAt: string;
};

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const useMarketQuotes = (symbols: string[]) =>
  useSWR<QuotesResponse>(
    `/api/market/quotes?symbols=${symbols.join(",")}`,
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

export const useStockDetails = (symbol: string) =>
  useSWR<StockResponse>(symbol ? `/api/market/stocks/${symbol}` : null, fetcher, {
    refreshInterval: 15000,
    revalidateOnFocus: true,
    keepPreviousData: true,
  });

