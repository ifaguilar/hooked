import { z } from "zod";

import { TMDBListParamsSchema } from "@/schemas/tmdb";

export type Dates = {
  maximum: string;
  minimum: string;
};

export type OriginalLanguage = "en" | "es" | "it" | "ja" | "ko" | "fr" | "ru" | "zh";

export type KnownForDepartment = "Acting";

export type MediaType = "movie" | "tv";

export type TMDBListParams = z.infer<typeof TMDBListParamsSchema>;

export interface TMDBListResponse<T> {
  dates?: Dates;
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

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

export interface TvShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  first_air_date?: Date;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: Date;
  video?: boolean;
}

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: KnownForDepartment;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownFor[];
}
