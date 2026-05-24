"use client";

import Link from "next/link";
import type { ElementType } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronUp,
  CircleDollarSign,
  Eye,
  LineChart as LineChartIcon,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockNews, mockPortfolio, mockTrendingStocks, mockWatchlist } from "@/lib/mockData";
import { useMarketQuotes } from "@/lib/api";
import { PriceChange } from "@/components/StockComponents";

const allocationData = [
  { name: "AAPL", value: 1824.5, color: "#2563eb" },
  { name: "MSFT", value: 2076.65, color: "#059669" },
  { name: "GOOGL", value: 1264.72, color: "#f59e0b" },
  { name: "AMZN", value: 3832.6, color: "#dc2626" },
  { name: "NVDA", value: 3493.8, color: "#7c3aed" },
];

const performanceData = [
  { month: "Jan", value: 95000, benchmark: 91000 },
  { month: "Feb", value: 105000, benchmark: 96500 },
  { month: "Mar", value: 110000, benchmark: 102800 },
  { month: "Apr", value: 108000, benchmark: 104400 },
  { month: "May", value: 115000, benchmark: 109600 },
  { month: "Jun", value: 125430, benchmark: 113900 },
];

const volumeData = [
  { label: "9:30", buy: 46, sell: 28 },
  { label: "10:30", buy: 58, sell: 32 },
  { label: "11:30", buy: 42, sell: 39 },
  { label: "12:30", buy: 64, sell: 26 },
  { label: "1:30", buy: 71, sell: 34 },
  { label: "2:30", buy: 55, sell: 48 },
  { label: "3:30", buy: 82, sell: 36 },
];

const marketPulse = [
  { label: "S&P 500", value: "5,321.4", change: "+0.82%" },
  { label: "Nasdaq", value: "16,742.9", change: "+1.14%" },
  { label: "VIX", value: "13.7", change: "-2.18%" },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Dashboard() {
  const quoteSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA", "META", "NFLX"];
  const { data: marketData } = useMarketQuotes(quoteSymbols);
  const quoteBySymbol = new Map(marketData?.data.map((quote) => [quote.symbol, quote]));
  const invested = mockPortfolio.holdings.reduce((total, holding) => total + holding.purchasePrice * holding.quantity, 0);
  const totalGain = mockPortfolio.totalValue - invested;
  const totalGainPercent = (totalGain / invested) * 100;
  const dataMode = marketData?.mode === "live" ? "Live data" : "Demo data";

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {dataMode}
                </div>
                <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                  Command center for your portfolio.
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  Track performance, risk, holdings, and market movement from one focused trading workspace.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/search"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Search className="h-4 w-4" />
                  Search
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  Add position
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {marketPulse.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{item.label}</span>
                    <span className={item.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}>{item.change}</span>
                  </div>
                  <div className="mt-1 text-xl font-bold text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Portfolio value</p>
                <p className="mt-1 text-3xl font-bold">{formatCurrency(mockPortfolio.totalValue)}</p>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <BriefcaseBusiness className="h-6 w-6 text-emerald-300" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <PriceChange change={mockPortfolio.todayGain} changePercent={mockPortfolio.todayGainPercent} />
              <span className="text-sm text-slate-400">today</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-white/10 p-3">
                <p className="text-slate-400">Buying power</p>
                <p className="mt-1 font-semibold">$18,420</p>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <p className="text-slate-400">Risk score</p>
                <p className="mt-1 font-semibold">Moderate</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={CircleDollarSign} label="Total gain" value={`+${formatCurrency(totalGain)}`} detail={`+${totalGainPercent.toFixed(2)}% all time`} tone="emerald" />
          <MetricCard icon={Activity} label="Daily P/L" value={`+${formatCurrency(mockPortfolio.todayGain)}`} detail="+1.90% vs yesterday" tone="blue" />
          <MetricCard icon={ShieldCheck} label="Diversification" value="82/100" detail="5 sectors balanced" tone="amber" />
          <MetricCard icon={Bell} label="Alerts" value="7 active" detail="2 near trigger price" tone="violet" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Performance</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Portfolio vs benchmark</h2>
              </div>
              <div className="flex rounded-md border border-slate-200 bg-slate-50 p-1 text-sm">
                {["1D", "1W", "1M", "6M", "1Y"].map((item, index) => (
                  <button
                    key={item}
                    className={`h-8 rounded px-3 font-semibold transition ${index === 3 ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="benchmark" stroke="#94a3b8" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fill="url(#portfolioFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Allocation</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Holdings mix</h2>
              </div>
              <LineChartIcon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-3 h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} innerRadius={66} outerRadius={92} paddingAngle={3} dataKey="value">
                    {allocationData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                  <span className="text-slate-500">{((item.value / mockPortfolio.totalValue) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-sm font-medium text-slate-500">Positions</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Top holdings</h2>
              </div>
              <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {mockPortfolio.holdings.map((holding) => (
                <Link key={holding.symbol} href={`/${holding.symbol}`} className="grid gap-3 p-4 transition hover:bg-slate-50 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                  {(() => {
                    const quote = quoteBySymbol.get(holding.symbol);
                    const currentPrice = quote?.price ?? holding.currentPrice;
                    const value = currentPrice * holding.quantity;
                    const gain = value - holding.purchasePrice * holding.quantity;
                    const gainPercent = (gain / (holding.purchasePrice * holding.quantity)) * 100;

                    return (
                      <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-100 text-sm font-bold text-slate-700">
                      {holding.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-950">{holding.symbol}</p>
                      <p className="text-sm text-slate-500">{holding.quantity} shares at ${currentPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-slate-950">${value.toFixed(2)}</p>
                    <p className="text-sm text-slate-500">Market value</p>
                  </div>
                  <PriceChange change={gain} changePercent={gainPercent} />
                      </>
                    );
                  })()}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Order flow</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Intraday activity</h2>
              </div>
              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-5 h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="buy" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sell" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Trending today</h2>
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-3">
              {mockTrendingStocks.map((stock) => (
                <Link key={stock.symbol} href={`/${stock.symbol}`} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50">
                  {(() => {
                    const quote = quoteBySymbol.get(stock.symbol);
                    const price = quote?.price ?? stock.price;
                    const changePercent = quote?.changePercent ?? stock.changePercent;

                    return (
                      <>
                  <div>
                    <p className="font-bold text-slate-950">{stock.symbol}</p>
                    <p className="text-sm text-slate-500">${price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-emerald-600">
                    {changePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                    {changePercent.toFixed(2)}%
                  </div>
                      </>
                    );
                  })()}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Watchlist</h2>
              <Link href="/watchlist" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Open</Link>
            </div>
            <div className="space-y-3">
              {mockWatchlist.map((stock) => (
                <Link key={stock.symbol} href={`/${stock.symbol}`} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition hover:bg-slate-100">
                  {(() => {
                    const quote = quoteBySymbol.get(stock.symbol);

                    return (
                      <>
                  <div>
                    <p className="font-bold text-slate-950">{stock.symbol}</p>
                    <p className="text-sm text-slate-500">{stock.name}</p>
                  </div>
                  <PriceChange change={quote?.change ?? stock.change} changePercent={quote?.changePercent ?? stock.changePercent} />
                      </>
                    );
                  })()}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Market news</h2>
              <Eye className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {mockNews.map((article) => (
                <article key={article.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                    <span>{article.source}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{article.time}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-6 text-slate-950">{article.title}</h3>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  icon: ElementType;
  label: string;
  value: string;
  detail: string;
  tone: "emerald" | "blue" | "amber" | "violet";
};

const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
};

function MetricCard({ icon: Icon, label, value, detail, tone }: MetricCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`rounded-md p-2 ${toneClasses[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>
      <div className="mt-2 flex items-center gap-1 text-sm font-medium text-slate-500">
        <ChevronUp className="h-4 w-4 text-emerald-500" />
        {detail}
      </div>
    </section>
  );
}
