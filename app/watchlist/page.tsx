"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockWatchlist } from "@/lib/mockData";
import { useMarketQuotes } from "@/lib/api";
import { PriceChange } from "@/components/StockComponents";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(mockWatchlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "change" | "name">("price");
  const { data: marketData } = useMarketQuotes(watchlist.map((stock) => stock.symbol));
  const quoteBySymbol = new Map(marketData?.data.map((quote) => [quote.symbol, quote]));

  const filteredWatchlist = watchlist
    .map((stock) => {
      const quote = quoteBySymbol.get(stock.symbol);

      return {
        ...stock,
        price: quote?.price ?? stock.price,
        change: quote?.change ?? stock.change,
        changePercent: quote?.changePercent ?? stock.changePercent,
      };
    })
    .filter((stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "change") return b.changePercent - a.changePercent;
      return a.symbol.localeCompare(b.symbol);
    });

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((s) => s.symbol !== symbol));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your favorite stocks</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "price" | "change" | "name")}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="price">Sort by Price</option>
            <option value="change">Sort by Change</option>
            <option value="name">Sort by Name</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Stock
          </button>
        </div>

        {/* Watchlist Table */}
        {filteredWatchlist.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <p className="text-lg text-gray-500 mb-2">No stocks in watchlist</p>
                <Link href="/search" className="text-blue-600 hover:text-blue-700 font-medium">
                  Add some stocks
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-4 p-4 bg-gray-50 dark:bg-gray-900 font-semibold text-sm border-b">
              <div className="col-span-4">Stock</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Change</div>
              <div className="col-span-2 text-right">52w High</div>
              <div className="col-span-2 text-right">52w Low</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {filteredWatchlist.map((stock) => (
                <Link key={stock.symbol} href={`/${stock.symbol}`}>
                  <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
                    <div className="col-span-4">
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                    <div className="col-span-2 text-right font-semibold">${stock.price.toFixed(2)}</div>
                    <div className="col-span-2 text-right">
                      <PriceChange change={stock.change} changePercent={stock.changePercent} />
                    </div>
                    <div className="col-span-2 text-right text-sm">${stock.week52High.toFixed(2)}</div>
                    <div className="col-span-2 text-right text-sm">${stock.week52Low.toFixed(2)}</div>
                    <div className="col-span-1 text-right">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWatchlist(stock.symbol);
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Market Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-gray-500 mb-1">Best Performer</p>
                <div className="font-semibold">{filteredWatchlist[0]?.symbol}</div>
                <div className="text-lg font-bold text-green-600">+{filteredWatchlist[0]?.changePercent.toFixed(2)}%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-gray-500 mb-1">Worst Performer</p>
                <div className="font-semibold">{filteredWatchlist[filteredWatchlist.length - 1]?.symbol}</div>
                <div className="text-lg font-bold text-red-600">{filteredWatchlist[filteredWatchlist.length - 1]?.changePercent.toFixed(2)}%</div>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-sm text-gray-500 mb-1">Average Change</p>
                <div className="text-lg font-bold">
                  {(filteredWatchlist.reduce((acc, s) => acc + s.changePercent, 0) / filteredWatchlist.length).toFixed(2)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
