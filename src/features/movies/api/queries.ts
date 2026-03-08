import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/features/movies/api/functions";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import { TMDBListParams } from "@/types/tmdb";
import { queryOptions } from "@tanstack/react-query";

export const movieQueries = {
  nowPlaying: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.NOW_PLAYING_MOVIES, params],
      queryFn: () => getNowPlayingMovies({ data: params }),
    }),

  popular: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.POPULAR_MOVIES, params],
      queryFn: () => getPopularMovies({ data: params }),
    }),

  topRated: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.TOP_RATED_MOVIES, params],
      queryFn: () => getTopRatedMovies({ data: params }),
    }),

  upcoming: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.UPCOMING_MOVIES, params],
      queryFn: () => getUpcomingMovies({ data: params }),
    }),
};
