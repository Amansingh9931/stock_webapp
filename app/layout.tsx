import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Stock Trading - Invest with Confidence",
  description: "A modern stock trading platform for retail investors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f6f8fb] text-slate-950">
        <Header />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="border-t border-slate-200 bg-white px-4 py-6 md:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Stock Trader</p>
            <p>Portfolio analytics and market monitoring workspace.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
