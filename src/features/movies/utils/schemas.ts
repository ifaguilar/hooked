import { z } from "zod";

export const MovieListParamsSchema = z.object({
  page: z.number().int().positive().catch(1),
});
