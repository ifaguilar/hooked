import { clientEnv } from "@/config/client-env";
import { TMDBImageSize, TMDBProfileSize } from "@/lib/tmdb/types/images";

export function getTMDBImageUrl(
  path: string | undefined,
  size: TMDBImageSize | TMDBProfileSize | "original",
): string | undefined {
  if (!path) return undefined;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${clientEnv.VITE_TMDB_IMAGE_BASE_URL}${size}${normalizedPath}`;
}
