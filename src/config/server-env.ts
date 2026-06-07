import { createServerOnlyFn } from "@tanstack/react-start";
import z from "zod";

const getServerEnv = createServerOnlyFn(() => {
  const serverEnvSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    TMDB_API_BASE_URL: z.url(),
    TMDB_API_KEY: z.string(),
  });

  const parsedServerEnv = serverEnvSchema.safeParse(process.env);

  if (!parsedServerEnv.success) {
    throw new Error("Missing environment variables");
  }

  return parsedServerEnv.data;
});

export const serverEnv = getServerEnv();
