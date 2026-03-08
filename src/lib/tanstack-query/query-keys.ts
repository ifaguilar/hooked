export const queryKeys = {
  MOVIES: ["movies"],
  NOW_PLAYING_MOVIES: ["movies", "now-playing"],
  POPULAR_MOVIES: ["movies", "popular"],
  TOP_RATED_MOVIES: ["movies", "top-rated"],
  UPCOMING_MOVIES: ["movies", "upcoming"],
  TV_SHOWS: ["tv-shows"],
  AIRING_TODAY_TV_SHOWS: ["tv-shows", "airing-today"],
  ON_THE_AIR_TV_SHOWS: ["tv-shows", "on-the-air"],
  POPULAR_TV_SHOWS: ["tv-shows", "popular"],
  TOP_RATED_TV_SHOWS: ["tv-shows", "top-rated"],
  PEOPLE: ["people"],
  POPULAR_PEOPLE: ["people", "popular"],
} as const;
