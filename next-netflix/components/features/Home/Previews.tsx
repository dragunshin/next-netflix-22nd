"use client";

import Image from "next/image";
import { useTrendingMoviesDay } from "@/hooks/useTrendingMoviesDay";
import { tmdbImage } from "@/lib/tmdbImage";

export default function Previews() {
  const { data, isLoading } = useTrendingMoviesDay("en-US");
  const previews = data?.results?.slice(0, 10) ?? [];

  return (
    <section className="bg-black px-4 pb-10 pt-6">
      <h2 className="text-[26px] text-white font-extrabold">Previews</h2>

      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* 로딩  */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-28 w-28 shrink-0 snap-start rounded-full bg-neutral-800 animate-pulse"
            />
          ))}

        {/* 프리뷰 */}
        {!isLoading &&
          previews.map((m) => {
            const src =
              tmdbImage(m.poster_path, "w342") ||
              tmdbImage(m.backdrop_path, "w342");
            return (
              <div key={m.id} className="snap-start">
                <div className="relative h-28 w-28 shrink-0 rounded-full bg-neutral-800">
                  {src && (
                    <Image
                      src={src}
                      alt={m.title}
                      fill
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
