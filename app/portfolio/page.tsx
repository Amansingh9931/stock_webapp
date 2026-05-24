"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockPortfolio } from "@/lib/mockData";
import Link from "next/link";
import { Download } from "lucide-react";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PortfolioPage() {
  const allocationData = mockPortfolio.holdings.map(h => ({
    name: h.symbol,
    value: h.value
  }));

  const performanceData = [
    { month: 'Jan', value: 95000, invested: 94000 },
    { month: 'Feb', value: 105000, invested: 98000 },
    { month: 'Mar', value: 110000, invested: 102000 },
    { month: 'Apr', value: 108000, invested: 104000 },
    { month: 'May', value: 115000, invested: 108000 },
    { month: 'Jun', value: 125430.50, invested: 110000 },
  ];

  const gainData = mockPortfolio.holdings.map(h => ({
    symbol: h.symbol,
    gain: h.gain,
    gainPercent: h.gainPercent
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Portfolio</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and track your investments</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockPortfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Gain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$8,542.47</div>
              <p className="text-xs text-gray-500 mt-1">+7.30%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPortfolio.holdings.length}</div>
              <p className="text-xs text-gray-500 mt-1">Stocks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Diversification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-gray-500 mt-1">Well diversified</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Growth over time vs invested amount</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#3B82F6" name="Current Value" />
                  <Line type="monotone" dataKey="invested" stroke="#9CA3AF" name="Invested" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) =>
                    typeof value === 'number'
                      ? `$${value.toFixed(0)}`
                      : Array.isArray(value)
                      ? value.join(", ")
                      : value ?? ""
                  } />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 text-xs">
                {allocationData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span>{item.name}</span>
                    <span className="ml-auto font-semibold">{((item.value / mockPortfolio.totalValue) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>Your stock positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Symbol</th>
                    <th className="text-right p-3 font-semibold">Quantity</th>
                    <th className="text-right p-3 font-semibold">Buy Price</th>
                    <th className="text-right p-3 font-semibold">Current Price</th>
                    <th className="text-right p-3 font-semibold">Value</th>
                    <th className="text-right p-3 font-semibold">Gain/Loss</th>
                    <th className="text-right p-3 font-semibold">Return %</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolio.holdings.map((holding) => (
                    <tr key={holding.symbol} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="p-3">
                        <Link href={`/${holding.symbol}`} className="font-semibold hover:text-blue-600">
                          {holding.symbol}
                        </Link>
                      </td>
                      <td className="text-right p-3">{holding.quantity}</td>
                      <td className="text-right p-3">${holding.purchasePrice.toFixed(2)}</td>
                      <td className="text-right p-3 font-semibold">${holding.currentPrice.toFixed(2)}</td>
                      <td className="text-right p-3">${holding.value.toFixed(2)}</td>
                      <td className={`text-right p-3 font-semibold ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gain >= 0 ? '+' : ''}{holding.gain.toFixed(2)}
                      </td>
                      <td className={`text-right p-3 font-semibold ${holding.gainPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gainPercent >= 0 ? '+' : ''}{holding.gainPercent.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Gain by Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Gain by Stock</CardTitle>
            <CardDescription>Which stocks are performing best</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gainData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip formatter={(value) =>
                  typeof value === 'number'
                    ? `$${value.toFixed(2)}`
                    : Array.isArray(value)
                    ? value.join(", ")
                    : value ?? ""
                } />
                <Bar dataKey="gain" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
