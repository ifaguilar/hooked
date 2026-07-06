import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { TMDBListResponse } from "@/lib/tmdb/types/api";
import type { Movie, MovieDetails } from "@/lib/tmdb/types/model";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";
import { tmdbFetch } from "@/lib/tmdb/utils/tmdb-fetch";

export const getNowPlayingMovies = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/now_playing", {
      params: data,
    });
  });

export const getPopularMovies = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/popular", {
      params: data,
    });
  });

export const getTopRatedMovies = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/top_rated", {
      params: data,
    });
  });

export const getUpcomingMovies = createServerFn()
  .validator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/upcoming", {
      params: data,
    });
  });

/* TODO: Check return type, zod schema and params */
export const getMovieDetails = createServerFn()
  .validator(z.object({ movieId: z.string() }))
  .handler(async ({ data }) => {
    return tmdbFetch<MovieDetails>(`/3/movie/${data.movieId}`, {
      params: { append_to_response: "credits,videos,similar" },
    });
  });
