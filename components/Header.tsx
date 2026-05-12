import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">₹</span>
                    </div>
                    <span className="font-bold text-xl hidden sm:inline">Stock Trader</span>
                </Link>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden sm:block flex-1 ml-8">
                    <NavItems />
                </nav>

                {/* User Dropdown */}
                <div className="flex items-center gap-2">
                    <UserDropdown />
                </div>
            </div>
        </header>
    )
}

export default Header;