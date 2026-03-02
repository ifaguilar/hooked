import { z } from "zod";

export const MovieListParamsSchema = z
  .object({
    page: z.number().optional().default(1),
    language: z.string().optional().default("en-US"),
  })
  .optional();
