"use client"

import { Nav_Items } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {

    const pathname = usePathname()
    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <ul className="flex gap-8">
            {Nav_Items.map(({ href, title }) => (
                <li key={href}>
                    <Link 
                        href={href} 
                        className={`text-sm font-medium transition-all duration-200 relative group ${
                            isActive(href)
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                    >
                        {title}
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full ${isActive(href) ? "w-full" : ""}`}></span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavItems;