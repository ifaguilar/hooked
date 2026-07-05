/* TODO: Improve this AI generated component */

import { UserCircle2 } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselOptions,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { CastMember } from "@/lib/tmdb/types/model";
import { getTMDBImageUrl } from "@/lib/tmdb/utils/get-tmdb-image-url";

const carouselOptions: Partial<CarouselOptions> = {
  align: "start",
  slidesToScroll: 3,
};

const MAX_CAST = 20;

interface MediaDetailsCastProps {
  cast: CastMember[];
}

export function MediaDetailsCast({ cast }: MediaDetailsCastProps) {
  const topCast = cast.slice(0, MAX_CAST);

  if (topCast.length === 0) return null;

  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent className="-ml-3">
        {topCast.map((member) => (
          <CarouselItem
            key={member.id}
            className="basis-1/3 pl-3 sm:basis-1/4 md:basis-1/5 lg:basis-[12.5%]"
          >
            <CastCard member={member} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function CastCard({ member }: { member: CastMember }) {
  const imageUrl = getTMDBImageUrl(member.profile_path ?? undefined, "w185");

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="bg-muted border-border/20 relative size-16 overflow-hidden rounded-full border-2 shadow-md sm:size-20 lg:size-24">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={member.name}
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="text-muted-foreground flex size-full items-center justify-center">
            <UserCircle2 className="size-10 opacity-40" />
          </div>
        )}
      </div>
      <div className="w-full">
        <p className="truncate text-xs leading-tight font-semibold sm:text-sm">
          {member.name}
        </p>
        <p className="text-muted-foreground truncate text-xs leading-tight">
          {member.character}
        </p>
      </div>
    </div>
  );
}

export function MediaDetailsCastSkeleton() {
  return (
    <Carousel opts={carouselOptions}>
      <CarouselContent className="-ml-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/3 pl-3 sm:basis-1/4 md:basis-1/5 lg:basis-[12.5%]"
          >
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="size-16 rounded-full sm:size-20 lg:size-24" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
