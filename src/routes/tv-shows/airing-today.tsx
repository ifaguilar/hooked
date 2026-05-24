import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CardGrid, CardGridSkeleton } from "@/components/layout/card-grid";
import { ListPagination } from "@/components/layout/list-pagination";
import { MediaCard } from "@/components/layout/media-card";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { TMDBListParamsSchema } from "@/schemas/tmdb";

export const Route = createFileRoute("/tv-shows/airing-today")({
  component: AiringTodayTvShowsPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(tvShowQueries.airingToday(deps));
  },
});

function AiringTodayTvShowsPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Airing Today</TypographyH2>
        <Suspense fallback={<CardGridSkeleton />}>
          <AiringTodayTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function AiringTodayTvShowsList() {
  const search = Route.useSearch();
  const { data: airingTodayTvShows } = useSuspenseQuery(tvShowQueries.airingToday(search));

  return (
    <>
      <CardGrid>
        {airingTodayTvShows.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={airingTodayTvShows.page}
        totalPages={airingTodayTvShows.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
