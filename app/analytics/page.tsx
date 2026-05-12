"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const performanceData = [
  { month: 'Jan', returns: 2.5 },
  { month: 'Feb', value: 105000, returns: 5.2 },
  { month: 'Mar', returns: 4.8 },
  { month: 'Apr', returns: -1.2 },
  { month: 'May', returns: 6.4 },
  { month: 'Jun', returns: 9.0 },
];

const sectorData = [
  { name: 'Technology', value: 40, return: 15.2 },
  { name: 'Healthcare', value: 25, return: 8.5 },
  { name: 'Finance', value: 20, return: 12.1 },
  { name: 'Energy', value: 10, return: 5.3 },
  { name: 'Consumer', value: 5, return: 3.2 },
];

const volatilityData = [
  { period: 'Week', volatility: 2.3 },
  { period: 'Month', volatility: 3.5 },
  { period: 'Quarter', volatility: 4.2 },
  { period: 'Year', volatility: 5.1 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Detailed insights into your portfolio</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>YTD Return</CardDescription>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+9.02%</div>
              <p className="text-xs text-gray-500 mt-2">Outperforming S&P 500</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Annualized Return</CardDescription>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+12.45%</div>
              <p className="text-xs text-gray-500 mt-2">3-year average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Volatility</CardDescription>
                <Activity className="w-4 h-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.2%</div>
              <p className="text-xs text-gray-500 mt-2">Standard deviation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Sharpe Ratio</CardDescription>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.85</div>
              <p className="text-xs text-gray-500 mt-2">Risk-adjusted return</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Returns Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Returns</CardTitle>
              <CardDescription>Your portfolio returns each month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="returns" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Volatility Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Volatility Trend</CardTitle>
              <CardDescription>Portfolio volatility over different periods</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={volatilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Line type="monotone" dataKey="volatility" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sector Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Analysis</CardTitle>
            <CardDescription>Portfolio composition and sector performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Sector</th>
                    <th className="text-right p-3 font-semibold">Allocation</th>
                    <th className="text-right p-3 font-semibold">Return</th>
                  </tr>
                </thead>
                <tbody>
                  {sectorData.map((sector) => (
                    <tr key={sector.name} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="p-3 font-medium">{sector.name}</td>
                      <td className="text-right p-3">{sector.value}%</td>
                      <td className={`text-right p-3 font-semibold ${sector.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        +{sector.return}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Portfolio Recommendations</CardTitle>
            <CardDescription>Suggestions to optimize your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <p className="font-semibold text-sm mb-1">Increase diversification</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consider adding healthcare and consumer stocks to reduce concentration risk.</p>
              </div>
              <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                <p className="font-semibold text-sm mb-1">Rebalance portfolio</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Technology stocks now represent 40% of your portfolio. Consider rebalancing to target allocation.</p>
              </div>
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                <p className="font-semibold text-sm mb-1">Strong performance</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your portfolio is outperforming the S&P 500 by 2.5%. Great job!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
