"use client";

import { useQuery } from "@tanstack/react-query";
import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

async function fetchPopularMovies(language = "en-US"): Promise<TMDBListResponse<TMDBMovie>> {
  const url = `/api/tmdb/movie/popular?language=${encodeURIComponent(language)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function usePopularMovies(language: string = "en-US") {
  return useQuery({
    queryKey: ["tmdb", "movie", "popular", language],
    queryFn: () => fetchPopularMovies(language),
  });
}
