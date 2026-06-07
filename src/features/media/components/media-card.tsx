import { Link } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MediaItem } from "@/features/media/types";
import { getMediaDetails } from "@/features/media/utils/details";
import { getTMDBImageUrl } from "@/lib/tmdb/utils/get-tmdb-image-url";
import { formatMediaYear, formatVoteAverage } from "@/utils/format";

export function MediaCard(props: MediaItem) {
  const { media } = props;

  const { title, date, linkOptions } = getMediaDetails(props);
  const year = formatMediaYear(date);

  return (
    <Link {...linkOptions} className="group">
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
            size="md"
            className="bg-background/60 absolute top-3 right-3 border border-white/10 font-bold shadow-sm backdrop-blur-xl"
          >
            <StarIcon className="fill-primary text-primary" />
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
