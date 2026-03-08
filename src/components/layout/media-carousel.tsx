import { MediaCard, MediaCardSkeleton } from "@/components/layout/media-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselOptions,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Movie } from "@/features/movies/types/model";
import type { TvShow } from "@/features/tv-shows/types/model";
import { RESULTS_PER_PAGE, SLIDES_TO_SCROLL } from "@/utils/constants";

type MediaCarouselProps =
  | { type: "movie"; items: Movie[] }
  | { type: "tv"; items: TvShow[] };

const carouselOptions: Partial<CarouselOptions> = {
  align: "start",
  slidesToScroll: SLIDES_TO_SCROLL,
};

export function MediaCarousel(props: MediaCarouselProps) {
  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent>
        {props.type === "movie"
          ? props.items.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 lg:basis-1/5">
                <MediaCard media={item} type="movie" />
              </CarouselItem>
            ))
          : props.items.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 lg:basis-1/5">
                <MediaCard media={item} type="tv" />
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}

export function MediaCarouselSkeleton() {
  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent>
        {Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
            <MediaCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}
