import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div>
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt="Mojo" width={140} height={32} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>
            </div>
        </header>
    )
}

export default Header;