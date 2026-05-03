import type { Movie, TvShow } from "@/types/tmdb";

export type MediaItem = { type: "movie"; media: Movie } | { type: "tv"; media: TvShow };

export type MediaDetails = {
  title: string;
  date: string;
  linkProps:
    | { to: "/tv-shows/$tvShowId"; params: { tvShowId: string } }
    | { to: "/movies/$movieId"; params: { movieId: string } };
};
