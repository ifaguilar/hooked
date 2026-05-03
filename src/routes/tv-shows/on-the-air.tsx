import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { MediaCard } from "@/components/layout/media-card";
import { MediaGrid, MediaGridSkeleton } from "@/components/layout/media-grid";
import { MediaPagination } from "@/components/layout/media-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { TMDBListParamsSchema } from "@/schemas/tmdb";

export const Route = createFileRoute("/tv-shows/on-the-air")({
  component: OnTheAirTvShowsPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(tvShowQueries.onTheAir(deps));
  },
});

function OnTheAirTvShowsPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>On The Air</TypographyH2>
        <Suspense fallback={<MediaGridSkeleton />}>
          <OnTheAirTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function OnTheAirTvShowsList() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(tvShowQueries.onTheAir(search));

  return (
    <>
      <MediaGrid>
        {data.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </MediaGrid>
      <MediaPagination
        currentPage={data.page}
        totalPages={data.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
