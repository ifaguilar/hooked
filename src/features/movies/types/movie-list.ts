export type Dates = {
  maximum: string;
  minimum: string;
};

export type OriginalLanguage = "en" | "fr" | "ru" | "zh";

export interface Movie {
  adult: boolean;
  backdrop_path: string | undefined;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | undefined;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResponse {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
