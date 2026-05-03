import { createServerFn } from "@tanstack/react-start";

import { Person } from "@/features/people/types/model";
import { tmdbFetch } from "@/lib/tmdb/tmdb-fetch";
import { TMDBListParamsSchema } from "@/schemas/tmdb";
import { TMDBListResponse } from "@/types/tmdb";

export const getPopularPeople = createServerFn()
  .inputValidator(TMDBListParamsSchema)
  .handler(async ({ data }) => {
    return tmdbFetch<TMDBListResponse<Person>>("/3/person/popular", {
      params: data,
    });
  });
