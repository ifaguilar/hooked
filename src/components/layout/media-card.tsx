import { Link } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTMDBImageUrl } from "@/lib/tmdb/tmdb-images";
import type { MediaItem } from "@/types/media";
import { formatMediaYear, formatVoteAverage } from "@/utils/format";
import { getMediaDetails } from "@/utils/media";

export function MediaCard(props: MediaItem) {
  const { media } = props;

  const { title, date, linkProps } = getMediaDetails(props);
  const year = formatMediaYear(date);

  return (
    <Link {...linkProps} className="group">
      <Card className="border-border/10 bg-card/50 relative h-full overflow-hidden pt-0 shadow-sm backdrop-blur-sm hover:shadow-md">
        <div className="relative aspect-2/3 overflow-hidden">
          <img
            src={getTMDBImageUrl(media.poster_path, "w500")}
            alt={title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

          <Badge
            variant="secondary"
            className="bg-background/60 absolute top-3 right-3 gap-1 border border-white/10 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-xl"
          >
            <StarIcon className="fill-primary text-primary size-3.5" />
            <span>{formatVoteAverage(media.vote_average)}</span>
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="group-hover:text-primary truncate text-base font-bold tracking-tight transition-colors">
            {title}
          </CardTitle>
          <CardDescription>{year}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function MediaCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden pt-0">
      <Skeleton className="aspect-2/3 w-full" />
      <CardHeader>
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </CardHeader>
    </Card>
  );
}
