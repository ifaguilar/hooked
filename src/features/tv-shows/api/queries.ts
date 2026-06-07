import { queryOptions } from "@tanstack/react-query";

import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  getTvShowDetails,
} from "@/features/tv-shows/api/functions";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import type { TMDBListParams } from "@/lib/tmdb/types/api";

export const tvShowQueries = {
  popular: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.POPULAR_TV_SHOWS, params],
      queryFn: () => getPopularTvShows({ data: params }),
    }),

  airingToday: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.AIRING_TODAY_TV_SHOWS, params],
      queryFn: () => getAiringTodayTvShows({ data: params }),
    }),

  onTheAir: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.ON_THE_AIR_TV_SHOWS, params],
      queryFn: () => getOnTheAirTvShows({ data: params }),
    }),

  topRated: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.TOP_RATED_TV_SHOWS, params],
      queryFn: () => getTopRatedTvShows({ data: params }),
    }),

  /* TODO: change type? */
  details: (tvShowId: string) =>
    queryOptions({
      queryKey: [...queryKeys.TV_SHOW_DETAILS, tvShowId],
      queryFn: () => getTvShowDetails({ data: { tvShowId } }),
    }),
};
