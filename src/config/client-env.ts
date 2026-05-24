import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_TMDB_IMAGE_BASE_URL: z.url(),
  VITE_PORTFOLIO_URL: z.url(),
});

const parsedClientEnv = clientEnvSchema.safeParse(import.meta.env);

if (!parsedClientEnv.success) {
  throw new Error("Invalid environment variables");
}

export const clientEnv = parsedClientEnv.data;
