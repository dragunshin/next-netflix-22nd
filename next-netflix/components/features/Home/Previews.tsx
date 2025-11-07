"use client";

import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/lib/tmdbImage";
import type { TMDBMovie } from "@/types/tmdb";

interface PreviewsProps {
  movies: TMDBMovie[];
}

export default function Previews({ movies }: PreviewsProps) {
  const previews = movies ?? [];

  return (
    <section className="bg-black px-4 pb-10 pt-6">
      <h2 className="text-[26px] text-white font-extrabold">Previews</h2>

      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {previews.map((m) => {
          const src = tmdbImage(m.poster_path, "w342") || tmdbImage(m.backdrop_path, "w342");

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
            <Link key={m.id} href={href} className="snap-start focus:outline-none">
              <div className="relative h-28 w-28 shrink-0 rounded-full bg-neutral-800 ring-1 ring-white/10">
                {src && (
                  <Image
                    src={src}
                    alt={m.title}
                    fill
                    className="rounded-full object-cover"
                    sizes="112px"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
