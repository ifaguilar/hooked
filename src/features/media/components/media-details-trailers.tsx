import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselOptions,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
/* TODO: Improve this AI generated component */
import { Skeleton } from "@/components/ui/skeleton";
import type { VideoResult } from "@/lib/tmdb/types/model";

const carouselOptions: Partial<CarouselOptions> = {
  align: "start",
  slidesToScroll: 1,
};

interface MediaDetailsTrailersProps {
  videos: VideoResult[];
}

function getYouTubeTrailers(videos: VideoResult[]): VideoResult[] {
  return videos.filter((v) => v.site === "YouTube" && v.type === "Trailer");
}

export function MediaDetailsTrailers({ videos }: MediaDetailsTrailersProps) {
  const trailers = getYouTubeTrailers(videos);

  if (trailers.length === 0) return null;

  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent className="-ml-4">
        {trailers.map((trailer) => (
          <CarouselItem
            key={trailer.id}
            className="basis-full pl-4 sm:basis-4/5 md:basis-3/5 lg:basis-2/5"
          >
            <TrailerCard trailer={trailer} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}

function TrailerCard({ trailer }: { trailer: VideoResult }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="border-border/10 bg-muted relative aspect-video overflow-hidden rounded-2xl border shadow-md">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      </div>
      <p className="text-muted-foreground truncate text-sm font-medium">
        {trailer.name}
      </p>
    </div>
  );
}

export function MediaDetailsTrailersSkeleton() {
  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent className="-ml-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-full pl-4 sm:basis-4/5 md:basis-3/5 lg:basis-2/5"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="aspect-video w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
