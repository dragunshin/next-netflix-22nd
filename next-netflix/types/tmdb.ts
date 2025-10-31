export type TMDBCommon = {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview?: string;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
};

export type TMDBMovie = TMDBCommon & {
  title: string;
  original_title?: string;
  release_date?: string;
  original_language?: string;
  genre_ids?: number[];
};

export type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
};
