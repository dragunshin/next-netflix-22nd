"use client";

import Image from "next/image";
import { useTrendingMoviesDay } from "@/hooks/useTrendingMoviesDay";
import { tmdbImage } from "@/lib/tmdbImage";
import fallbackPoster from "@/public/fallback.svg";

export default function Continue() {
  const { data, isLoading } = useTrendingMoviesDay("en-US");
  const items = data?.results ?? [];

  return (
    <section className="bg-black px-4 pb-5">
      <h2 className="mb-4 text-white text-[21px] font-bold">
        Continue Watching for Hammoo
      </h2>

      <div className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* 로딩 */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`s-${i}`}
              className="h-[161px] w-[103px] shrink-0 snap-start rounded-xs bg-neutral-800 animate-pulse"
            />
          ))}

        {!isLoading &&
          items.map((m) => {
            const src =
              tmdbImage(m.poster_path, "w342") ||
              tmdbImage(m.backdrop_path, "w342") ||
              fallbackPoster.src;

            return (
              <div
                key={m.id}
                className="relative h-[161px] w-[103px] shrink-0 snap-start overflow-hidden rounded-xs bg-neutral-900"
              >
                <Image
                  src={src}
                  alt={m.title}
                  fill
                  className="object-cover"
                  sizes="103px"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src !== fallbackPoster.src)
                      img.src = fallbackPoster.src;
                  }}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}
