import { z } from "zod";

export const TMDBListParamsSchema = z.object({
  page: z.number().int().positive().catch(1),
});
