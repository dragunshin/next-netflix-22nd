"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

async function searchMovies(
  query: string,
  page: number,
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  const url = `/api/tmdb/search/movie?query=${encodeURIComponent(
    query
  )}&language=${encodeURIComponent(language)}&page=${page}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function useSearchMovies(query: string, language: string = "en-US") {
  return useInfiniteQuery({
    queryKey: ["tmdb", "search", "movie", query, language],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam, language),
    enabled: query.trim().length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page && lastPage.total_pages && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    //staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
