import type { MediaItem, MediaDetails } from "@/types/media";
import { Person } from "@/types/tmdb";

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

// TODO: improve this
export function getPersonDetails(person: Person) {
  // Format known-for works
  const knownFor = person.known_for
    ?.map((work) => work.title || work.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return {
    knownFor,
    linkProps: {
      to: "/people/$personId",
      params: { movieId: String(person.id) },
    },
  };
}
