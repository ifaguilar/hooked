import { Movie } from "@/features/movies/types/model";
import { tmdbFetch } from "@/lib/tmdb/tmdb-fetch";
import { TMDBListResponse } from "@/types/tmdb";
import { TMDBListParamsSchema } from "@/schemas/tmdb";
import { createServerFn } from "@tanstack/react-start";

export const getNowPlayingMovies = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/now_playing", {
      params: data,
    });
  });

export const getPopularMovies = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/popular", {
      params: data,
    });
  });

export const getTopRatedMovies = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/top_rated", {
      params: data,
    });
  });

export const getUpcomingMovies = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Movie>>("/3/movie/upcoming", {
      params: data,
    });
  });
