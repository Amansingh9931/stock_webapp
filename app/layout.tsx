import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Stock Trading - Invest with Confidence",
  description: "A modern stock trading platform for retail investors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="border-t py-6 px-4 md:px-6 bg-gray-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Stock Trading Platform. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
