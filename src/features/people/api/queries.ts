import { queryOptions } from "@tanstack/react-query";

import { getPopularPeople } from "@/features/people/api/functions";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import { TMDBListParams } from "@/lib/tmdb/types/images";

export const personQueries = {
  popular: (params: TMDBListParams) =>
    queryOptions({
      queryKey: [...queryKeys.POPULAR_PEOPLE, params],
      queryFn: () => getPopularPeople({ data: params }),
    }),
};
