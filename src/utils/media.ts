import type { MediaItem, MediaDetails } from "@/types/media";

export function getMediaDetails(item: MediaItem): MediaDetails {
  const isTvShow = item.type === "tv";

  if (isTvShow) {
    return {
      title: item.media.name,
      date: item.media.first_air_date,
      linkProps: {
        to: "/tv-shows/$tvShowId",
        params: { tvShowId: String(item.media.id) },
      },
    };
  }

  return {
    title: item.media.title,
    date: item.media.release_date,
    linkProps: {
      to: "/movies/$movieId",
      params: { movieId: String(item.media.id) },
    },
  };
}
