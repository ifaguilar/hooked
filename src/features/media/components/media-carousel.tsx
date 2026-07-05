import { CardSkeleton } from "@/components/layout/card-skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselOptions,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MediaCard } from "@/features/media/components/media-card";
import type { MediaItem } from "@/features/media/types";
import { Movie, TvShow } from "@/lib/tmdb/types/model";
import { RESULTS_PER_PAGE, SLIDES_TO_SCROLL } from "@/utils/constants";

// TODO: Check repeated type
type MediaCarouselProps =
  | { type: "movie"; items: Movie[] }
  | { type: "tv"; items: TvShow[] };

const carouselOptions: Partial<CarouselOptions> = {
  align: "start",
  slidesToScroll: SLIDES_TO_SCROLL,
};

function getMediaItems(props: MediaCarouselProps): MediaItem[] {
  return props.type === "movie"
    ? props.items.map((media) => ({ type: "movie", media }))
    : props.items.map((media) => ({ type: "tv", media }));
}

export function MediaCarousel(props: MediaCarouselProps) {
  const mediaItems = getMediaItems(props);

  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent>
        {mediaItems.map((item) => (
          <CarouselItem key={item.media.id} className="basis-1/2 lg:basis-1/5">
            <MediaCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function MediaCarouselSkeleton() {
  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent>
        {Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
            <CardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
