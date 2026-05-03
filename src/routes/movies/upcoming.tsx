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

export const Route = createFileRoute("/movies/upcoming")({
  component: UpcomingMoviesPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(movieQueries.upcoming(deps));
  },
});

function UpcomingMoviesPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Upcoming</TypographyH2>
        <Suspense fallback={<MediaGridSkeleton />}>
          <UpcomingMoviesList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function UpcomingMoviesList() {
  const search = Route.useSearch();
  const { data: upcomingMovies } = useSuspenseQuery(movieQueries.upcoming(search));

  return (
    <>
      <MediaGrid>
        {upcomingMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </MediaGrid>
      <MediaPagination
        currentPage={upcomingMovies.page}
        totalPages={upcomingMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
