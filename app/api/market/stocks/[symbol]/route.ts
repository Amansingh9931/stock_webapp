import { NextResponse } from "next/server";
import { getChartData, getMarketQuote } from "@/lib/marketData";

type RouteContext = {
  params: Promise<{
    symbol: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { symbol } = await context.params;
  const [quote, chart] = await Promise.all([getMarketQuote(symbol), getChartData(symbol)]);

  return NextResponse.json({
    data: {
      quote,
      chart,
    },
    mode: quote.provider === "finnhub" ? "live" : "demo",
    updatedAt: new Date().toISOString(),
  });
}

