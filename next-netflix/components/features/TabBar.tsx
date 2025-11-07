"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/images/tabBar/home.svg";
import DownLoadIcon from "@/images/tabBar/download.svg";
import PlayIcon from "@/images/tabBar/play.svg";
import SearchIcon from "@/images/tabBar/search.svg";
import BurgerIcon from "@/images/tabBar/burger.svg";

type Item = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  adjust?: string;
};

const items: ReadonlyArray<Item> = [
  { href: "/home", label: "Home", Icon: HomeIcon },
  { href: "/search", label: "Search", Icon: SearchIcon },
  {
    href: "/coming-soon",
    label: "Coming Soon",
    Icon: PlayIcon,
    adjust: "transform translate-y-[1px] translate-x-[3px]",
  },
  { href: "/downloads", label: "Downloads", Icon: DownLoadIcon },
  {
    href: "/more",
    label: "More",
    Icon: BurgerIcon,
    adjust: "transform translate-y-[4px] translate-x-[1px]",
  },
] as const;

export function TabBar() {
  const pathname = usePathname();

  // 랜딩 페이지에서는 TabBar 숨기기
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black backdrop-blur max-w-[375px] mx-auto">
      <ul
        className="
          grid w-full
          grid-cols-5 justify-items-center
          pb-[calc(8px+env(safe-area-inset-bottom))] pt-2
        "
      >
        {items.map(({ href, label, Icon, adjust }) => {
          const active = href === "/home" ? pathname === "/home" : pathname.startsWith(href);

          return (
            <li key={href} className="flex flex-col items-center">
              <Link href={href} className="flex flex-col items-center">
                <Icon
                  className={[
                    "block h-6 w-6",
                    active ? "text-white" : "text-[#8c8787]",
                    adjust ?? "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                <span className={`text-[8.2px] ${active ? "text-white" : "text-[#8c8787]"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
