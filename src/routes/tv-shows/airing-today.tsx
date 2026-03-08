import { MediaCard } from "@/components/layout/media-card";
import { MediaGrid, MediaGridSkeleton } from "@/components/layout/media-grid";
import { MediaPagination } from "@/components/layout/media-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { TMDBListParamsSchema } from "@/schemas/tmdb";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

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
        <Suspense fallback={<MediaGridSkeleton />}>
          <AiringTodayTvShowsList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function AiringTodayTvShowsList() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(tvShowQueries.airingToday(search));

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
