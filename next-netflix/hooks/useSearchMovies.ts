"use client";

import { useQuery } from "@tanstack/react-query";
import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

async function searchMovies(
  query: string,
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  const url = `/api/tmdb/search/movie?query=${encodeURIComponent(
    query
  )}&language=${encodeURIComponent(language)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function useSearchMovies(query: string, language: string = "en-US") {
  return useQuery({
    queryKey: ["tmdb", "search", "movie", query, language],
    queryFn: () => searchMovies(query, language),
    enabled: query.trim().length > 0,
  });
}
