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

  if (pathname === "/") {
    return null;
  }

  return (
    <nav
      className="absolute top-0 left-0 z-50 flex items-center"
      style={{
        width: '338px',
        height: '57px',
        paddingTop: '24px',
        paddingLeft: '16px',
        backgroundColor: 'transparent'
      }}
    >
      <Link
        href="/home"
        className="flex items-center"
        style={{
          width: '56.67px',
          height: '100%'
        }}
      >
        <NetflixIcon
          style={{
            width: '56.67px',
            height: 'auto'
          }}
        />
      </Link>
      <ul className="flex items-center ml-6" style={{ gap: '32px' }}>
        {menuItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                fontSize: '17.2px',
                whiteSpace: 'nowrap'
              }}
              className="text-black"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
