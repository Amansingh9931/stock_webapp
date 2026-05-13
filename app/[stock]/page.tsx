"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockChartData, mockStocks } from "@/lib/mockData";
import { PriceChange } from "@/components/StockComponents";
import { Plus, Share2, Heart } from "lucide-react";
import { useParams } from "next/navigation";

export default function StockDetailsPage() {
  const params = useParams();
  const symbol = (params?.stock as string) || "AAPL";
  
  const stock = mockStocks.find((s) => s.symbol === symbol);

  if (!stock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Stock not found</h1>
          <p className="text-gray-500">The stock you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  const volumeData = [
    { time: "09:30", volume: 2500000 },
    { time: "10:00", volume: 3000000 },
    { time: "10:30", volume: 2800000 },
    { time: "11:00", volume: 4000000 },
    { time: "11:30", volume: 3200000 },
    { time: "12:00", volume: 2900000 },
    { time: "12:30", volume: 3500000 },
    { time: "13:00", volume: 4200000 },
    { time: "13:30", volume: 3800000 },
    { time: "14:00", volume: 4500000 },
    { time: "14:30", volume: 4100000 },
    { time: "15:00", volume: 3200000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Stock Header */}
      <section className="border-b py-6 px-4 md:px-6 sticky top-16 bg-background z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xl font-bold">{symbol[0]}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{symbol}</h1>
                <p className="text-gray-500">{stock.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
              <PriceChange change={stock.change} changePercent={stock.changePercent} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Buy
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Price Chart</CardTitle>
                  <div className="flex gap-2">
                    {["1D", "1W", "1M", "3M", "1Y", "All"].map((period) => (
                      <button key={period} className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 rounded">
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                    <Tooltip formatter={(value) =>
                      typeof value === 'number'
                        ? `$${value.toFixed(2)}`
                        : Array.isArray(value)
                        ? value.join(", ")
                        : value ?? ""
                    } />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3B82F6"
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) =>
                      typeof value === 'number'
                        ? `${(value / 1e6).toFixed(2)}M`
                        : Array.isArray(value)
                        ? value.join(", ")
                        : value ?? ""
                    } />
                    <Bar dataKey="volume" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-500">Market Cap</span>
                  <span className="font-semibold">${(stock.marketCap / 1e12).toFixed(2)}T</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-500">Volume</span>
                  <span className="font-semibold">{(stock.volume / 1e6).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-500">52w High</span>
                  <span className="font-semibold">$199.62</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-500">52w Low</span>
                  <span className="font-semibold">$164.08</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-500">P/E Ratio</span>
                  <span className="font-semibold">28.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dividend Yield</span>
                  <span className="font-semibold">0.50%</span>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stock.name} is a technology company known for innovation and excellence. The company has a strong financial position and continues to deliver value to shareholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Stocks */}
        <Card>
          <CardHeader>
            <CardTitle>Related Stocks</CardTitle>
            <CardDescription>Similar companies in the same sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockStocks.filter((s) => s.symbol !== symbol).slice(0, 4).map((relatedStock) => (
                <div key={relatedStock.symbol} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <div className="font-semibold mb-2">{relatedStock.symbol}</div>
                  <div className="text-lg font-bold mb-2">${relatedStock.price.toFixed(2)}</div>
                  <PriceChange change={relatedStock.change} changePercent={relatedStock.changePercent} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
