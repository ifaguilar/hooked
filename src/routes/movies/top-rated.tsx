import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { MediaCard } from "@/components/layout/media-card";
import { MediaGrid, MediaGridSkeleton } from "@/components/layout/media-grid";
import { MediaPagination } from "@/components/layout/media-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { movieQueries } from "@/features/movies/api/queries";
import { TMDBListParamsSchema } from "@/schemas/tmdb";

export const Route = createFileRoute("/movies/top-rated")({
  component: TopRatedMoviesPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(movieQueries.topRated(deps));
  },
});

function TopRatedMoviesPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Top-Rated</TypographyH2>
        <Suspense fallback={<MediaGridSkeleton />}>
          <TopRatedMoviesList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function TopRatedMoviesList() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(movieQueries.topRated(search));

  return (
    <>
      <MediaGrid>
        {data.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
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
