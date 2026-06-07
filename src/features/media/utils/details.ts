import { linkOptions } from "@tanstack/react-router";

import type { MediaItem } from "@/features/media/types";

export function getMediaDetails(item: MediaItem) {
  if (item.type === "tv") {
    return {
      title: item.media.name,
      date: item.media.first_air_date,
      linkOptions: linkOptions({
        to: "/tv-shows/$tvShowId",
        params: { tvShowId: String(item.media.id) },
      }),
    };
  }

  return {
    title: item.media.title,
    date: item.media.release_date,
    linkOptions: linkOptions({
      to: "/movies/$movieId",
      params: { movieId: String(item.media.id) },
    }),
  };
}
