import Link from "next/link";
import { Bell, Search } from "lucide-react";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-85">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
            <span className="text-lg font-bold">$</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-base font-bold leading-5 text-slate-950">Stock Trader</span>
            <span className="block text-xs font-medium text-slate-500">Portfolio workspace</span>
          </div>
        </Link>

        <nav className="hidden flex-1 justify-center lg:flex">
          <NavItems />
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search stocks"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            aria-label="Notifications"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 sm:flex"
          >
            <Bell className="h-4 w-4" />
          </button>
          <UserDropdown />
        </div>
      </div>

      <nav className="border-t border-slate-100 px-4 py-2 lg:hidden">
        <div className="mx-auto max-w-7xl overflow-x-auto">
          <NavItems />
        </div>
      </nav>
    </header>
  );
};

export default Header;
