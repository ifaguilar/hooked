import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  TMDB_API_BASE_URL: z.url(),
  TMDB_API_KEY: z.string(),
});

const clientEnvSchema = z.object({
  VITE_TMDB_IMAGE_BASE_URL: z.url(),
  VITE_PORTFOLIO_URL: z.url(),
});

export const serverEnv = serverEnvSchema.safeParse(process.env);

export const clientEnv = clientEnvSchema.safeParse(import.meta.env);
