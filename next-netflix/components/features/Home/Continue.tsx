"use client";

import Image from "next/image";
import { tmdbImage } from "@/lib/tmdbImage";
import fallbackPoster from "@/public/fallback.svg";
import type { TMDBMovie } from "@/types/tmdb";
import Link from "next/link";

interface ContinueProps {
  movies: TMDBMovie[];
}

export default function Continue({ movies }: ContinueProps) {
  const items = movies;

  return (
    <section className="bg-black px-4 pb-5">
      <h2 className="mb-4 text-white text-[21px] font-bold">Continue Watching for Hammoo</h2>

      <div className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((m) => {
          const src =
            tmdbImage(m.poster_path, "w342") ||
            tmdbImage(m.backdrop_path, "w342") ||
            fallbackPoster.src;

          const href = {
            pathname: `/detail/${m.id}`,
            query: {
              title: m.title ?? "",
              poster_path: m.poster_path ?? "",
              backdrop_path: m.backdrop_path ?? "",
              overview: m.overview ?? "",
              release_date: m.release_date ?? "",
              original_language: m.original_language ?? "",
            },
          } as const;

          return (
            <Link
              key={m.id}
              href={href}
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
                  if (img.src !== fallbackPoster.src) img.src = fallbackPoster.src;
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
