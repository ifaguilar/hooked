import type { Movie, TvShow } from "@/lib/tmdb/types/images";

export type MediaItem =
  | { type: "movie"; media: Movie }
  | { type: "tv"; media: TvShow };
