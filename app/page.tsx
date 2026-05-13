"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { mockPortfolio, mockChartData, mockTrendingStocks, mockNews } from "@/lib/mockData";
import { PriceChange, StockCard } from "@/components/StockComponents";
import { TrendingUp, TrendingDown, Plus, Eye } from "lucide-react";
import Link from "next/link";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Dashboard() {
  const allocationData = [
    { name: 'AAPL', value: 1824.50 },
    { name: 'MSFT', value: 2076.65 },
    { name: 'GOOGL', value: 1264.72 },
    { name: 'AMZN', value: 3832.60 },
    { name: 'NVDA', value: 3493.80 },
  ];

  const performanceData = [
    { month: 'Jan', value: 95000 },
    { month: 'Feb', value: 105000 },
    { month: 'Mar', value: 110000 },
    { month: 'Apr', value: 108000 },
    { month: 'May', value: 115000 },
    { month: 'Jun', value: 125430.50 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your investment overview</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardDescription>Total Portfolio Value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${mockPortfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <PriceChange change={mockPortfolio.todayGain} changePercent={mockPortfolio.todayGainPercent} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardDescription>Total Gain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+$8,542.47</div>
              <p className="text-sm text-gray-500 mt-2">Since inception</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardDescription>Holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockPortfolio.holdings.length}</div>
              <p className="text-sm text-gray-500 mt-2">Active stocks</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your investment growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) =>
                    typeof value === 'number'
                      ? `$${value.toFixed(2)}`
                      : Array.isArray(value)
                      ? value.join(", ")
                      : value ?? ""
                  } />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Holdings and Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Holdings */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Holdings</CardTitle>
                  <CardDescription>View all your stock positions</CardDescription>
                </div>
                <Link href="/portfolio" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPortfolio.holdings.map((holding) => (
                  <Link key={holding.symbol} href={`/${holding.symbol}`}>
                    <div className="p-3 rounded-lg border hover:shadow-md transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{holding.symbol}</p>
                          <p className="text-xs text-gray-500">{holding.quantity} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${holding.value.toFixed(2)}</p>
                          <PriceChange change={holding.gain} changePercent={holding.gainPercent} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Stocks */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trending Today</CardTitle>
                  <CardDescription>Popular stocks in the market</CardDescription>
                </div>
                <Link href="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Explore →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTrendingStocks.map((stock) => (
                  <Link key={stock.symbol} href={`/${stock.symbol}`}>
                    <div className="p-3 rounded-lg border hover:shadow-md transition-all cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <span className="text-sm font-bold">{stock.symbol.substring(0, 1)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{stock.symbol}</p>
                            <p className="text-xs text-gray-500">${stock.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {stock.trend === 'up' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          )}
                          <span className={stock.trend === 'up' ? 'text-green-600 font-semibold text-sm' : 'text-red-600 font-semibold text-sm'}>
                            +{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market News */}
        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
            <CardDescription>Latest financial news and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockNews.map((article) => (
                <div key={article.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h4>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{article.source}</span>
                      <span>{article.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
