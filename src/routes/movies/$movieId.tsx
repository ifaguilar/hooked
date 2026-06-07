import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import {
  MediaDetailsCast,
  MediaDetailsCastSkeleton,
} from "@/features/media/components/media-details-cast";
import {
  MediaDetailsHero,
  MediaDetailsHeroSkeleton,
} from "@/features/media/components/media-details-hero";
import {
  MediaDetailsSimilar,
  MediaDetailsSimilarSkeleton,
} from "@/features/media/components/media-details-similar";
import {
  MediaDetailsStats,
  MediaDetailsStatsSkeleton,
} from "@/features/media/components/media-details-stats";
import {
  MediaDetailsTrailers,
  MediaDetailsTrailersSkeleton,
} from "@/features/media/components/media-details-trailers";
import { movieQueries } from "@/features/movies/api/queries";

export const Route = createFileRoute("/movies/$movieId")({
  component: MovieDetailsPage,
  loader: ({ context, params }) => {
    context.queryClient.prefetchQuery(movieQueries.details(params.movieId));
  },
});

function MovieDetailsPage() {
  const { movieId } = Route.useParams();

  return (
    <>
      <Suspense fallback={<MediaDetailsHeroSkeleton />}>
        <MovieDetailsHero movieId={movieId} />
      </Suspense>

      <PageContainer>
        <Suspense
          fallback={
            <>
              <MediaDetailsStatsSkeleton />
              <PageSection>
                <TypographyH2>Top Billed Cast</TypographyH2>
                <MediaDetailsCastSkeleton />
              </PageSection>
              <PageSection>
                <TypographyH2>Trailers</TypographyH2>
                <MediaDetailsTrailersSkeleton />
              </PageSection>
              <PageSection>
                <TypographyH2>More Like This</TypographyH2>
                <MediaDetailsSimilarSkeleton />
              </PageSection>
            </>
          }
        >
          <MovieDetailsSections movieId={movieId} />
        </Suspense>
      </PageContainer>
    </>
  );
}

function MovieDetailsHero({ movieId }: { movieId: string }) {
  const { data: movie } = useSuspenseQuery(movieQueries.details(movieId));
  return <MediaDetailsHero type="movie" media={movie} />;
}

function MovieDetailsSections({ movieId }: { movieId: string }) {
  const { data: movie } = useSuspenseQuery(movieQueries.details(movieId));

  return (
    <>
      <MediaDetailsStats
        status={movie.status}
        originalLanguage={movie.original_language}
        voteCount={movie.vote_count}
        homepage={movie.homepage || undefined}
      />

      {movie.credits.cast.length > 0 ? (
        <PageSection>
          <TypographyH2>Top Billed Cast</TypographyH2>
          <MediaDetailsCast cast={movie.credits.cast} />
        </PageSection>
      ) : null}

      {movie.videos.results.some(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      ) ? (
        <PageSection>
          <TypographyH2>Trailers</TypographyH2>
          <MediaDetailsTrailers videos={movie.videos.results} />
        </PageSection>
      ) : null}

      {movie.similar.results.length > 0 ? (
        <PageSection>
          <TypographyH2>More Like This</TypographyH2>
          <MediaDetailsSimilar type="movie" items={movie.similar.results} />
        </PageSection>
      ) : null}
    </>
  );
}
