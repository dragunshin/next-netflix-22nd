"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "../../images/home.svg";
import DownLoadIcon from "../../images/download.svg";
import PlayIcon from "../../images/play.svg";
import SearchIcon from "../../images/search.svg";
import BurgerIcon from "../../images/burger.svg";

type Item = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  adjust?: string;
};

const items: ReadonlyArray<Item> = [
  { href: "/", label: "Home", Icon: HomeIcon },
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

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#121212] backdrop-blur">
      <ul
        className="
          mx-auto grid max-w-[375px]
          grid-cols-5 justify-items-center
          px-[30px]
          pb-[calc(8px+env(safe-area-inset-bottom))] pt-2
        "
      >
        {items.map(({ href, label, Icon, adjust }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

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
                <span
                  className={`text-[8.2px] ${
                    active ? "text-white" : "text-[#8c8787]"
                  }`}
                >
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
