import { z } from "zod";

import { FIRST_PAGE, MAX_PAGE } from "@/utils/constants";

export const TMDBListParamsSchema = z.object({
  page: z.number().int().positive().max(MAX_PAGE).catch(FIRST_PAGE).default(FIRST_PAGE),
});
