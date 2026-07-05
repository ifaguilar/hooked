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

export const Route = createFileRoute("/tv-shows/top-rated")({
  component: TopRatedTvShowsPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(tvShowQueries.topRated(deps));
  },
});

function TopRatedTvShowsPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Top-Rated</TypographyH2>
        <Suspense fallback={<CardGridSkeleton />}>
          <TopRatedTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function TopRatedTvShowsList() {
  const search = Route.useSearch();
  const { data: topRatedTvShows } = useSuspenseQuery(
    tvShowQueries.topRated(search),
  );

  return (
    <>
      <CardGrid>
        {topRatedTvShows.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={topRatedTvShows.page}
        totalPages={topRatedTvShows.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
