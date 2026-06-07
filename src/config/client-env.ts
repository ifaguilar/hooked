import z from "zod";

function getClientEnv() {
  const clientEnvSchema = z.object({
    VITE_TMDB_IMAGE_BASE_URL: z.url(),
    VITE_PORTFOLIO_URL: z.url(),
  });

  const parsedClientEnv = clientEnvSchema.safeParse(import.meta.env);

  if (!parsedClientEnv.success) {
    throw new Error("Missing environment variables");
  }

  return parsedClientEnv.data;
}

export const clientEnv = getClientEnv();
