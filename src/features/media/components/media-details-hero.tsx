/* TODO: Improve this AI generated component */
import { StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import type { MovieDetails, TvShowDetails } from "@/lib/tmdb/types/model";
import { getTMDBImageUrl } from "@/lib/tmdb/utils/get-tmdb-image-url";
import { formatMediaYear, formatVoteAverage } from "@/utils/format";

type MediaDetailsHeroProps =
  | { type: "movie"; media: MovieDetails }
  | { type: "tv"; media: TvShowDetails };

function getHeroDetails(props: MediaDetailsHeroProps) {
  if (props.type === "tv") {
    const { media } = props;
    const runtime =
      media.episode_run_time.length > 0
        ? `${media.episode_run_time[0]}m / ep`
        : null;
    const seasons =
      media.number_of_seasons > 0
        ? `${media.number_of_seasons} Season${media.number_of_seasons > 1 ? "s" : ""}`
        : null;
    return {
      title: media.name,
      date: media.first_air_date,
      runtimeLabel: [seasons, runtime].filter(Boolean).join(" · "),
    };
  }

  const { media } = props;
  const runtime = media.runtime
    ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
    : null;
  return {
    title: media.title,
    date: media.release_date,
    runtimeLabel: runtime,
  };
}

export function MediaDetailsHero(props: MediaDetailsHeroProps) {
  const { media } = props;
  const { title, date, runtimeLabel } = getHeroDetails(props);
  const year = formatMediaYear(date);
  const rating = formatVoteAverage(media.vote_average);

  return (
    <div className="bg-muted relative w-full overflow-hidden">
      {/* Backdrop */}
      <img
        src={getTMDBImageUrl(media.backdrop_path, "original")}
        alt={title}
        className="absolute inset-0 size-full object-cover"
        loading="eager"
      />

      {/* Gradients */}
      <div className="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="from-background/80 absolute inset-0 bg-linear-to-r via-transparent to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto flex min-h-[70svh] flex-col justify-end gap-6 p-6 md:p-12 lg:p-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          {/* Poster */}
          <div className="hidden shrink-0 md:block">
            <img
              src={getTMDBImageUrl(media.poster_path, "w342")}
              alt={title}
              className="border-border/20 h-72 w-auto rounded-2xl border object-cover shadow-2xl lg:h-80"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                size="lg"
                className="bg-background/60 border border-white/10 font-semibold shadow-sm backdrop-blur-xl"
              >
                <StarIcon className="fill-primary text-primary" />
                <span>{rating}</span>
              </Badge>
              {year && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-semibold tracking-wide">
                    {year}
                  </span>
                </>
              )}
              {runtimeLabel && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-semibold tracking-wide">
                    {runtimeLabel}
                  </span>
                </>
              )}
              {media.status && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <Badge variant="outline" size="md">
                    {media.status}
                  </Badge>
                </>
              )}
            </div>

            {/* Title */}
            <TypographyH1 className="text-4xl md:text-5xl lg:text-6xl">
              {title}
            </TypographyH1>

            {/* Tagline */}
            {media.tagline && (
              <p className="text-muted-foreground text-lg font-medium italic">
                &ldquo;{media.tagline}&rdquo;
              </p>
            )}

            {/* Genre pills */}
            {media.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {media.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary" size="md">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-muted-foreground line-clamp-4 max-w-2xl text-base leading-relaxed font-medium md:text-lg">
              {media.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MediaDetailsHeroSkeleton() {
  return (
    <div className="bg-muted relative min-h-[70svh] w-full overflow-hidden">
      <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />
      <div className="relative container mx-auto flex min-h-[70svh] flex-col justify-end gap-6 p-6 md:p-12 lg:p-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <Skeleton className="bg-secondary/40 hidden h-80 w-52 shrink-0 rounded-2xl md:block" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Skeleton className="bg-secondary/40 h-7 w-20 rounded-full" />
              <Skeleton className="bg-secondary/40 h-7 w-12 rounded-full" />
              <Skeleton className="bg-secondary/40 h-7 w-16 rounded-full" />
            </div>
            <Skeleton className="bg-secondary/40 h-14 w-80 md:w-[500px]" />
            <Skeleton className="bg-secondary/40 h-5 w-56" />
            <div className="flex gap-2">
              <Skeleton className="bg-secondary/40 h-6 w-16 rounded-full" />
              <Skeleton className="bg-secondary/40 h-6 w-20 rounded-full" />
              <Skeleton className="bg-secondary/40 h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="bg-secondary/40 h-24 w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
