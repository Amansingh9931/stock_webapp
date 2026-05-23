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
        <ul className="flex min-w-max items-center gap-2">
            {Nav_Items.map(({ href, title }) => (
                <li key={href}>
                    <Link 
                        href={href} 
                        className={`relative group block rounded-md px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                            isActive(href)
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                    >
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavItems;
