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

export const Route = createFileRoute("/tv-shows/popular")({
  component: PopularTvShowsPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(tvShowQueries.popular(deps));
  },
});

function PopularTvShowsPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Popular</TypographyH2>
        <Suspense fallback={<CardGridSkeleton />}>
          <PopularTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function PopularTvShowsList() {
  const search = Route.useSearch();
  const { data: popularTvShows } = useSuspenseQuery(
    tvShowQueries.popular(search),
  );

  return (
    <>
      <CardGrid>
        {popularTvShows.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={popularTvShows.page}
        totalPages={popularTvShows.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
