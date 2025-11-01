"use client";

import Image from "next/image";
import { useTrendingMoviesDay } from "@/hooks/useTrendingMoviesDay";
import { tmdbImage } from "@/lib/tmdbImage";
import fallbackPoster from "@/public/fallback.svg";

export default function TrendingMovies() {
  const { data, isLoading, isError, error } = useTrendingMoviesDay("en-US");

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-[300px] rounded-lg bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
        <h3 className="font-bold">Error</h3>
        <p className="mt-1 text-sm">
          {(error as Error)?.message ?? "Failed to load."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
      {data.results.map((m) => {
        const src =
          tmdbImage(m.poster_path, "w500") ||
          tmdbImage(m.backdrop_path, "w500");
        const alt = m.title ?? "Poster";

        return (
          <div
            key={m.id}
            className="bg-white text-black rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={src || fallbackPoster.src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.src !== window.location.origin + fallbackPoster.src) {
                    img.src = fallbackPoster.src;
                  }
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg truncate" title={m.title}>
                {m.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Release: {m.release_date ?? "N/A"}
              </p>
              <div className="mt-2 flex justify-between items-center text-sm">
                <span className="font-semibold text-blue-600">
                  Rating: {(m.vote_average ?? 0).toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({m.vote_count ?? 0} votes)
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
