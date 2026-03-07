import { getNowPlayingMovies } from "@/features/movies/api/get-now-playing-movies";
import { getPopularMovies } from "@/features/movies/api/get-popular-movies";
import { getTopRatedMovies } from "@/features/movies/api/get-top-rated-movies";
import { getUpcomingMovies } from "@/features/movies/api/get-upcoming-movies";
import { MovieListParams } from "@/features/movies/types/movie-list";
import { queryKeys } from "@/lib/tanstack-query/query-keys";

export function getNowPlayingMoviesQueryOptions(params: MovieListParams) {
  return {
    queryKey: [queryKeys.NOW_PLAYING_MOVIES, params],
    queryFn: () =>
      getNowPlayingMovies({
        data: params,
      }),
  };
}

export function getPopularMoviesQueryOptions(params: MovieListParams) {
  return {
    queryKey: [queryKeys.POPULAR_MOVIES, params],
    queryFn: () =>
      getPopularMovies({
        data: params,
      }),
  };
}

export function getTopRatedMoviesQueryOptions(params: MovieListParams) {
  return {
    queryKey: [queryKeys.TOP_RATED_MOVIES, params],
    queryFn: () =>
      getTopRatedMovies({
        data: params,
      }),
  };
}

export function getUpcomingMoviesQueryOptions(params: MovieListParams) {
  return {
    queryKey: [queryKeys.UPCOMING_MOVIES, params],
    queryFn: () =>
      getUpcomingMovies({
        data: params,
      }),
  };
}
