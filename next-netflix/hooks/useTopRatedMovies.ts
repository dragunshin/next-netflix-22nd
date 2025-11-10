"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

async function fetchTopRatedMovies(
  page: number,
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  const url = `/api/tmdb/movie/top_rated?language=${encodeURIComponent(language)}&page=${page}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export function useTopRatedMovies(language: string = "en-US") {
  return useInfiniteQuery({
    queryKey: ["tmdb", "movie", "top_rated", language],
    queryFn: ({ pageParam = 1 }) => fetchTopRatedMovies(pageParam, language),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page && lastPage.total_pages && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
