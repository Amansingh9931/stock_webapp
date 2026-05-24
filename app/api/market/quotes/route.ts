import { NextResponse } from "next/server";
import { getMarketQuotes } from "@/lib/marketData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbols = searchParams
    .get("symbols")
    ?.split(",")
    .map((symbol) => symbol.trim())
    .filter(Boolean);

  const quotes = await getMarketQuotes(symbols);

  return NextResponse.json({
    data: quotes,
    mode: quotes.some((quote) => quote.provider === "finnhub") ? "live" : "demo",
    updatedAt: new Date().toISOString(),
  });
}

