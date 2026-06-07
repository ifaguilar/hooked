import { z } from "zod";

import { Dates } from "@/lib/tmdb/types/model";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";

export type TMDBListParams = z.infer<typeof TMDBListParamsSchema>;

export interface TMDBListResponse<T> {
  dates?: Dates;
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
