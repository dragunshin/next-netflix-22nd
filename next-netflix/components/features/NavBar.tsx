"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NetflixIcon from "@/images/navBar/netflixIcon.svg";

type MenuItem = {
  href: string;
  label: string;
};

const menuItems: ReadonlyArray<MenuItem> = [
  { href: "/tv-shows", label: "TV Shows" },
  { href: "/movies", label: "Movies" },
  { href: "/my-list", label: "My List" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/search") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center max-w-[375px] h-[57px] pt-6 pl-4 bg-transparent mx-auto">
      <Link href="/home" className="flex items-center w-[56.67px] h-full">
        <NetflixIcon className="w-[56.67px] h-auto" />
      </Link>
      <ul className="flex items-center ml-6 gap-8">
        {menuItems.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-white text-[17.2px] whitespace-nowrap">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
