"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockStocks } from "@/lib/mockData";
import { PriceChange, StockCard } from "@/components/StockComponents";
import { Search, Clock } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(["AAPL", "MSFT"]);

  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mockStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleAddRecent = (symbol: string) => {
    setRecentSearches((prev) => [symbol, ...prev.filter((s) => s !== symbol)].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Search Stocks</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Find and track your favorite companies</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by symbol (e.g., AAPL) or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg border-2"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {searchQuery.trim() === "" ? (
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((symbol) => (
                      <Link key={symbol} href={`/${symbol}`}>
                        <button
                          onClick={() => handleAddRecent(symbol)}
                          className="px-4 py-2 border rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                          {symbol}
                        </button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Popular Stocks */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Stocks</CardTitle>
                <CardDescription>Most searched stocks today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockStocks.slice(0, 6).map((stock) => (
                    <Link key={stock.symbol} href={`/${stock.symbol}`}>
                      <StockCard {...stock} />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
              {filteredStocks.length > 0 && (
                <span className="text-lg font-normal text-gray-500 ml-2">({filteredStocks.length} found)</span>
              )}
            </h2>

            {filteredStocks.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <p className="text-lg text-gray-500 mb-2">No results found</p>
                    <p className="text-sm text-gray-400">Try searching with a different keyword</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStocks.map((stock) => (
                  <Link
                    key={stock.symbol}
                    href={`/${stock.symbol}`}
                    onClick={() => handleAddRecent(stock.symbol)}
                  >
                    <div className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer h-full">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{stock.symbol}</h3>
                          <p className="text-sm text-gray-500">{stock.name}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-bold">${stock.price.toFixed(2)}</span>
                          <PriceChange change={stock.change} changePercent={stock.changePercent} />
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
                          <span>Market Cap: ${(stock.marketCap / 1e9).toFixed(1)}B</span>
                          <span>Vol: {(stock.volume / 1e6).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
