import { MovieListResponse } from "@/features/movies/types/movie-list";
import { MovieListParamsSchema } from "@/features/movies/utils/schemas";
import { tmdbFetch } from "@/lib/tmdb/tmdb-fetch";
import { createServerFn } from "@tanstack/react-start";

export const getTopRatedMovies = createServerFn()
  .inputValidator(MovieListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<MovieListResponse>("/3/movie/top_rated", {
      params: data,
    });
  });
