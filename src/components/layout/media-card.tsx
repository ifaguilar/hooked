import { Link } from "@tanstack/react-router";
import { StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/features/movies/types/model";
import { TvShow } from "@/features/tv-shows/types/model";
import { getTMDBImageUrl } from "@/lib/tmdb/tmdb-images";
import { formatMediaYear, formatVoteAverage } from "@/utils/format";

type MediaCardProps = { type: "movie"; media: Movie } | { type: "tv"; media: TvShow };

export function MediaCard(props: MediaCardProps) {
  const { media, type } = props;
  const isMovie = type === "movie";

  const title = isMovie ? props.media.title : props.media.name;
  const date = isMovie ? props.media.release_date : props.media.first_air_date;
  const year = formatMediaYear(date);
  const linkTo = isMovie ? "/movies/$movieId" : "/tv-shows/$tvShowId";
  const params = isMovie ? { movieId: String(media.id) } : { tvShowId: String(media.id) };

  return (
    <Link to={linkTo} params={params} className="group">
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
