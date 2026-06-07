import { MediaCarousel, MediaCarouselSkeleton } from "@/features/media/components/media-carousel";
import type { Movie, TvShow } from "@/lib/tmdb/types/model";

/* TODO check repeated type */
type MediaDetailsSimilarProps = { type: "movie"; items: Movie[] } | { type: "tv"; items: TvShow[] };

export function MediaDetailsSimilar(props: MediaDetailsSimilarProps) {
  if (props.items.length === 0) return null;

  return <MediaCarousel {...props} />;
}

export function MediaDetailsSimilarSkeleton() {
  return <MediaCarouselSkeleton />;
}
