import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "@/features/movies/components/movie-card";
import type { Movie } from "@/features/movies/types/movie-list";

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 2,
      }}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="basis-1/2 lg:basis-1/5">
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}
