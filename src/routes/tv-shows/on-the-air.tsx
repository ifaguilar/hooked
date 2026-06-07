import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CardGrid, CardGridSkeleton } from "@/components/layout/card-grid";
import { ListPagination } from "@/components/layout/list-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { MediaCard } from "@/features/media/components/media-card";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";

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
        <Suspense fallback={<CardGridSkeleton />}>
          <OnTheAirTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function OnTheAirTvShowsList() {
  const search = Route.useSearch();
  const { data: onTheAirTvShows } = useSuspenseQuery(tvShowQueries.onTheAir(search));

  return (
    <>
      <CardGrid>
        {onTheAirTvShows.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={onTheAirTvShows.page}
        totalPages={onTheAirTvShows.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
