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
