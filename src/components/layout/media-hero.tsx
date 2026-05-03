import { Link } from "@tanstack/react-router";
import { PlayCircle, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import { Movie } from "@/features/movies/types/model";
import { TvShow } from "@/features/tv-shows/types/model";
import { getTMDBImageUrl } from "@/lib/tmdb/tmdb-images";
import { cn } from "@/utils/cn";
import { formatMediaYear, formatVoteAverage } from "@/utils/format";

type MediaHeroProps = { type: "movie"; media: Movie } | { type: "tv"; media: TvShow };

export function MediaHero(props: MediaHeroProps) {
  const { media, type } = props;
  const isMovie = type === "movie";

  const title = isMovie ? media.title : media.name;
  const date = isMovie ? media.release_date : media.first_air_date;
  const year = formatMediaYear(date);
  const rating = formatVoteAverage(media.vote_average);

  const linkTo = isMovie ? "/movies/$movieId" : "/tv-shows/$tvShowId";
  const params = isMovie ? { movieId: String(media.id) } : { tvShowId: String(media.id) };

  return (
    <div className="bg-muted relative h-[80svh] w-full overflow-hidden">
      <img
        src={getTMDBImageUrl(media.backdrop_path, "original")}
        alt={title}
        className="absolute inset-0 size-full object-cover"
        loading="eager"
      />

      <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="from-background/40 absolute inset-0 bg-linear-to-r via-transparent to-transparent" />

      <div className="absolute inset-0 container mx-auto flex w-full flex-col justify-end gap-4 p-6 md:p-12 lg:p-16">
        <div className="flex items-center gap-3">
          {/* TODO: Check for repeated classes */}
          <Badge
            variant="secondary"
            className="bg-background/60 gap-1.5 border border-white/10 px-3 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-xl"
          >
            <StarIcon className="fill-primary text-primary size-4" />
            <span>{rating}</span>
          </Badge>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-semibold tracking-wide">{year}</span>
        </div>

        {/* TODO: set responsive typography */}
        <TypographyH1 className="md:text-6xl">{title}</TypographyH1>

        <p className="text-muted-foreground line-clamp-3 max-w-2xl text-lg leading-relaxed font-medium">
          {media.overview}
        </p>

        <Link
          to={linkTo}
          params={params}
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "rounded-full px-8 h-12 text-base font-semibold self-start mt-4",
          )}
        >
          <PlayCircle className="size-5" />
          View Details
        </Link>
      </div>
    </div>
  );
}

export function MediaHeroSkeleton() {
  return (
    <div className="bg-muted relative h-[80svh] w-full overflow-hidden">
      <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />

      <div className="absolute inset-0 container mx-auto flex flex-col justify-end gap-4 p-6 md:p-12 lg:p-16">
        <Skeleton className="bg-secondary/50 h-6 w-32 rounded-full" />
        <Skeleton className="bg-secondary/50 h-12 w-3/4 md:h-20" />
        <Skeleton className="bg-secondary/50 h-20 w-1/2" />
        <Skeleton className="bg-secondary/50 h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
