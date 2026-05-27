# Stock Trader

Stock Trader is a Next.js stock portfolio and market-monitoring web app. It includes a dashboard, stock search, watchlist, portfolio analytics, stock detail pages, profile/settings screens, local API routes, and live market-data support with demo fallback data.

## What Is Built

- Dashboard at `/` with portfolio value, daily gain, allocation chart, performance chart, top holdings, trending stocks, watchlist preview, order-flow chart, and market news.
- Stock search at `/search` with searchable symbols/company names, recent searches, popular stocks, and quote cards.
- Watchlist at `/watchlist` with filtering, sorting, remove action, and market summary cards.
- Portfolio page at `/portfolio` with summary stats, allocation chart, performance chart, holdings table, and gain-by-stock chart.
- Stock detail page at `/[stock]`, for example `/AAPL`, with price chart, volume chart, key statistics, quote status, and related stocks.
- Analytics page at `/analytics` with return, volatility, Sharpe ratio, sector analysis, and recommendations.
- Account pages at `/profile`, `/settings`, `/sign-in`, and `/sign-up`.
- Backend API routes for market quotes and stock detail data.
- Mock data fallback so the app works without any external API key.
- Optional Finnhub integration for live quote and intraday candle data.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- SWR for frontend polling and cache behavior
- Recharts for charts
- Lucide React for icons
- Radix UI and shadcn-style UI primitives
- Finnhub REST API for optional live market data

## How Things Connect

The app is organized around three main layers:

1. Pages and components render the UI.
2. Client hooks fetch data from internal API routes.
3. Server-side API routes fetch live data or return mock data.

Data flow:

```text
Browser page/component
  -> lib/api.ts SWR hook
  -> app/api/market/... Next.js API route
  -> lib/marketData.ts
  -> Finnhub API if FINNHUB_API_KEY exists
  -> lib/mockData.ts fallback if no key or request fails
  -> JSON response back to the page
```

Example for dashboard quotes:

```text
app/page.tsx
  -> useMarketQuotes(["AAPL", "MSFT", ...])
  -> GET /api/market/quotes?symbols=AAPL,MSFT,...
  -> getMarketQuotes()
  -> Finnhub quote endpoint or mockStocks
  -> dashboard updates every 15 seconds through SWR
```

Example for a stock detail page:

```text
app/[stock]/page.tsx
  -> useStockDetails(symbol)
  -> GET /api/market/stocks/[symbol]
  -> getMarketQuote(symbol) + getChartData(symbol)
  -> Finnhub quote/candle endpoints or mock data
  -> stock detail charts and statistics
```

## Important Files

```text
app/layout.tsx
```

Defines the global HTML shell, shared header, main content area, and footer.

```text
components/Header.tsx
components/NavItems.tsx
components/UserDropdown.tsx
```

Build the top navigation, mobile nav, search/notification buttons, and user dropdown links.

```text
components/StockComponents.tsx
```

Reusable stock UI helpers such as `PriceChange` and `StockCard`.

```text
lib/api.ts
```

Contains frontend SWR hooks:

- `useMarketQuotes(symbols)`
- `useStockDetails(symbol)`

Both hooks poll every 15 seconds and keep previous data while refreshing.

```text
lib/marketData.ts
```

Server-side market-data layer. It normalizes symbols, reads `FINNHUB_API_KEY`, calls Finnhub when available, and falls back to mock data when there is no key or the API fails.

```text
lib/mockData.ts
```

Demo stocks, portfolio holdings, watchlist items, chart points, news, and trending stocks used throughout the app.

```text
app/api/market/quotes/route.ts
```

API route for multiple quotes:

```text
GET /api/market/quotes?symbols=AAPL,MSFT,NVDA
```

Returns:

- `data`: quote array
- `mode`: `live` or `demo`
- `updatedAt`: response timestamp

```text
app/api/market/stocks/[symbol]/route.ts
```

API route for one stock:

```text
GET /api/market/stocks/AAPL
```

Returns:

- `data.quote`
- `data.chart`
- `mode`: `live` or `demo`
- `updatedAt`: response timestamp

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main dashboard and portfolio command center |
| `/search` | Search stocks and open detail pages |
| `/watchlist` | Track selected stocks |
| `/portfolio` | Holdings, allocation, performance, and gain charts |
| `/analytics` | Portfolio performance insights |
| `/[stock]` | Dynamic stock detail page, such as `/AAPL` |
| `/profile` | Account profile form and account stats |
| `/settings` | Appearance, notifications, security, and preferences |
| `/sign-in` | Sign-in UI |
| `/sign-up` | Registration UI |

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

On Windows PowerShell, if `npm run ...` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Market Data Setup

The app works without an API key by using mock data from `lib/mockData.ts`.

To enable live Finnhub quotes, create `.env.local` in the project root:

```bash
FINNHUB_API_KEY=your_finnhub_api_key_here
```

Then restart the dev server.

When the key exists, `lib/marketData.ts` calls:

- Finnhub quote API for current prices.
- Finnhub stock candle API for intraday chart data.

If Finnhub returns an error, empty response, or the key is missing, the app automatically uses demo data.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- This project is a portfolio and market-monitoring UI, not a real brokerage or trading execution platform.
- Auth screens are currently UI-only. They do not connect to a real authentication provider yet.
- Portfolio, watchlist, news, recommendations, and user profile values are currently demo/static data.
- Live quote support is server-side so the Finnhub key is not exposed to the browser.
- For production trading or real-money usage, use licensed real-time market data, clear delay labels, real authentication, persistent storage, and a separate broker/order-execution integration.
