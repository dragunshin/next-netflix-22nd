import type { TMDBListResponse, TMDBMovie } from "@/types/tmdb";

const API_BASE = "https://api.themoviedb.org/3";

async function fetchTMDB<T>(path: string, language = "en-US"): Promise<T> {
  const token = process.env.TMDB_API_KEY;
  if (!token) {
    throw new Error("TMDB_API_KEY missing");
  }

  const url = `${API_BASE}/${path}?language=${encodeURIComponent(language)}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 }, // 1시간마다 데이터 갱신
  });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMoviesDay(
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  return fetchTMDB<TMDBListResponse<TMDBMovie>>(
    "trending/movie/day",
    language
  );
}

export async function getPopularMovies(
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  return fetchTMDB<TMDBListResponse<TMDBMovie>>("movie/popular", language);
}

export async function getTopRatedMovies(
  language = "en-US"
): Promise<TMDBListResponse<TMDBMovie>> {
  return fetchTMDB<TMDBListResponse<TMDBMovie>>("movie/top_rated", language);
}
