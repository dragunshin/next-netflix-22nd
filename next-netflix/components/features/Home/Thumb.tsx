"use client";

import Image from "next/image";
import { tmdbImage } from "@/lib/tmdbImage";
import InfoIcon from "@/images/info.svg";
import PlusIcon from "@/images/plus.svg";
import Top10Icon from "@/images/top10.svg";
import type { TMDBMovie } from "@/types/tmdb";

interface ThumbProps {
  movies: TMDBMovie[];
}

export default function Thumb({ movies }: ThumbProps) {
  const m = movies?.[0];
  const src =
    tmdbImage(m?.backdrop_path, "w1280") || tmdbImage(m?.poster_path, "w780");

  return (
    <section className="w-full bg-black">
      <div className="relative h-[415px] w-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={m?.title ?? "thumb"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      <div className="px-6 pt-4 pb-6 flex flex-col items-center gap-4">
        <p className="text-[14px] font-semibold tracking-wide text-white flex items-center gap-2">
          <Top10Icon className="h-[15px] w-[15px]" aria-hidden />
          <span>#2 in Korea Today</span>
        </p>

        <div className="flex w-full max-w-[360px] items-center justify-center gap-6">
          <button className="flex min-w-[90px] flex-col items-center text-sm text-white/80">
            <PlusIcon className="h-[24px] w-[24px]" aria-hidden />
            <span className="mt-1 text-white">My List</span>
          </button>

          <button
            type="button"
            className="inline-flex h-[45px] w-[120px] items-center justify-center gap-2 rounded-lg bg-[#C4C4C4] text-black font-bold shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <span className="-mt-[1px] text-[18px] leading-none">▶</span>
            <span className="text-[16px] leading-none">Play</span>
          </button>

          <button className="flex min-w-[90px] flex-col items-center text-sm text-white/80">
            <InfoIcon className="h-[24px] w-[24px]" aria-hidden />
            <span className="mt-1 text-white">Info</span>
          </button>
        </div>
      </div>
    </section>
  );
}
