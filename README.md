# Stock Trader

A Next.js portfolio and market-monitoring workspace with frontend screens, backend API routes, live-data support, and demo fallback data.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

On Windows PowerShell, if `npm run ...` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Market Data Setup

The project runs without keys using demo data. To show real market quotes, create `.env.local`:

```bash
FINNHUB_API_KEY=your_finnhub_api_key_here
```

Then restart the dev server. API keys stay server-side in these routes:

- `GET /api/market/quotes?symbols=AAPL,MSFT,NVDA`
- `GET /api/market/stocks/AAPL`

The frontend polls those routes every 15 seconds through SWR. For a production trading terminal, use a paid real-time WebSocket/SIP feed and stream updates from your backend to the browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Recommended Real-Time Data APIs

- Alpaca Market Data: good for paper trading plus market data in one ecosystem. Use IEX/delayed data for development and SIP for full-market real-time data.
- Polygon/Massive: strong production market-data provider with WebSocket streams for trades, quotes, and aggregates.
- Twelve Data: broad global coverage and WebSocket support, useful if you want US plus international equities.
- Finnhub: easiest starter integration for this project because the quote REST API is simple and works well as a first live-data backend.

For real money trading, do not use demo quotes or delayed data. Use a licensed real-time feed, clearly label delays, and separate market-data APIs from broker order execution APIs.

