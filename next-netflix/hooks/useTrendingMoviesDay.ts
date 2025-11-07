"use client";

import { useQuery } from "@tanstack/react-query";
import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

async function fetchTrendingMoviesDay(language = "en-US"): Promise<TMDBListResponse<TMDBMovie>> {
  const url = `/api/tmdb/trending/movie/day?language=${encodeURIComponent(language)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function useTrendingMoviesDay(language: string = "en-US") {
  return useQuery({
    queryKey: ["tmdb", "trending", "movie", "day", language],
    queryFn: () => fetchTrendingMoviesDay(language),
  });
}
