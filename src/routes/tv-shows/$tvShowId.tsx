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
import { tvShowQueries } from "@/features/tv-shows/api/queries";

export const Route = createFileRoute("/tv-shows/$tvShowId")({
  component: TvShowDetailsPage,
  loader: ({ context, params }) => {
    context.queryClient.prefetchQuery(tvShowQueries.details(params.tvShowId));
  },
});

function TvShowDetailsPage() {
  const { tvShowId } = Route.useParams();

  return (
    <>
      <Suspense fallback={<MediaDetailsHeroSkeleton />}>
        <TvShowDetailsHero tvShowId={tvShowId} />
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
          <TvShowDetailsSections tvShowId={tvShowId} />
        </Suspense>
      </PageContainer>
    </>
  );
}

function TvShowDetailsHero({ tvShowId }: { tvShowId: string }) {
  const { data: tvShow } = useSuspenseQuery(tvShowQueries.details(tvShowId));
  return <MediaDetailsHero type="tv" media={tvShow} />;
}

function TvShowDetailsSections({ tvShowId }: { tvShowId: string }) {
  const { data: tvShow } = useSuspenseQuery(tvShowQueries.details(tvShowId));

  return (
    <>
      <MediaDetailsStats
        status={tvShow.status}
        originalLanguage={tvShow.original_language}
        voteCount={tvShow.vote_count}
        homepage={tvShow.homepage || undefined}
      />

      {tvShow.credits.cast.length > 0 ? (
        <PageSection>
          <TypographyH2>Top Billed Cast</TypographyH2>
          <MediaDetailsCast cast={tvShow.credits.cast} />
        </PageSection>
      ) : null}

      {tvShow.videos.results.some(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      ) ? (
        <PageSection>
          <TypographyH2>Trailers</TypographyH2>
          <MediaDetailsTrailers videos={tvShow.videos.results} />
        </PageSection>
      ) : null}

      {tvShow.similar.results.length > 0 ? (
        <PageSection>
          <TypographyH2>More Like This</TypographyH2>
          <MediaDetailsSimilar type="tv" items={tvShow.similar.results} />
        </PageSection>
      ) : null}
    </>
  );
}
