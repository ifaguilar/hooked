export type TMDBImageSize = "w92" | "w154" | "w185" | "w300" | "w342" | "w500" | "w780" | "w1280";

export type TMDBProfileSize = "w45" | "w185" | "h632";

export function getTMDBImageUrl(
  path: string | undefined,
  size: TMDBImageSize | TMDBProfileSize | "original",
): string | undefined {
  if (!path) return undefined;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${size}${normalizedPath}`;
}
