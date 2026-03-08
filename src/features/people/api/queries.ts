import { getPopularPeople } from "@/features/people/api/functions";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import { TMDBListParams } from "@/types/tmdb";
import { queryOptions } from "@tanstack/react-query";

export const personQueries = {
  popular: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.POPULAR_PEOPLE, params],
      queryFn: () => getPopularPeople({ data: params }),
    }),
};
