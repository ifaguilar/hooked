import { createServerFn } from "@tanstack/react-start";

import { type Person, type TMDBListResponse } from "@/lib/tmdb/types/images";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";
import { tmdbFetch } from "@/lib/tmdb/utils/tmdb-fetch";

export const getPopularPeople = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Person>>("/3/person/popular", {
      params: data,
    });
  });
