import { z } from "zod";

import { FIRST_PAGE, MAX_PAGES } from "@/utils/constants";

export const TMDBListParamsSchema = z.object({
  page: z.number().int().positive().max(MAX_PAGES).catch(FIRST_PAGE).default(FIRST_PAGE),
});
