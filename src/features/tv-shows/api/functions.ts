import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { TMDBListResponse } from "@/lib/tmdb/types/api";
import type { TvShow, TvShowDetails } from "@/lib/tmdb/types/model";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";
import { tmdbFetch } from "@/lib/tmdb/utils/tmdb-fetch";

export const getPopularTvShows = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/popular", {
      params: data,
    });
  });

export const getAiringTodayTvShows = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/airing_today", {
      params: data,
    });
  });

export const getOnTheAirTvShows = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/on_the_air", {
      params: data,
    });
  });

export const getTopRatedTvShows = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/top_rated", {
      params: data,
    });
  });

/* TODO: Check return type, zod schema and params */
export const getTvShowDetails = createServerFn()
  .validator(z.object({ tvShowId: z.string() }))
  .handler(async ({ data }) => {
    return tmdbFetch<TvShowDetails>(`/3/tv/${data.tvShowId}`, {
      params: { append_to_response: "credits,videos,similar" },
    });
  });
