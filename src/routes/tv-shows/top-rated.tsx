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
        <Suspense fallback={<MediaGridSkeleton />}>
          <TopRatedTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function TopRatedTvShowsList() {
  const search = Route.useSearch();
  const { data: topRatedTvShows } = useSuspenseQuery(tvShowQueries.topRated(search));

  return (
    <>
      <MediaGrid>
        {topRatedTvShows.results.map((tvShow) => (
          <MediaCard key={tvShow.id} media={tvShow} type="tv" />
        ))}
      </MediaGrid>
      <MediaPagination
        currentPage={topRatedTvShows.page}
        totalPages={topRatedTvShows.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
