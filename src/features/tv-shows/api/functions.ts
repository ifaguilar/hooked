import { createServerFn } from "@tanstack/react-start";

import { tmdbFetch } from "@/lib/tmdb/tmdb-fetch";
import { TMDBListParamsSchema } from "@/schemas/tmdb";
import { type TMDBListResponse, type TvShow } from "@/types/tmdb";

export const getPopularTvShows = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/popular", {
      params: data,
    });
  });

export const getAiringTodayTvShows = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/airing_today", {
      params: data,
    });
  });

export const getOnTheAirTvShows = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/on_the_air", {
      params: data,
    });
  });

export const getTopRatedTvShows = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<TvShow>>("/3/tv/top_rated", {
      params: data,
    });
  });
