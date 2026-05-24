import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CardGrid, CardGridSkeleton } from "@/components/layout/card-grid";
import { ListPagination } from "@/components/layout/list-pagination";
import { MediaCard } from "@/components/layout/media-card";
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
        <Suspense fallback={<CardGridSkeleton />}>
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
      <CardGrid>
        {upcomingMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={upcomingMovies.page}
        totalPages={upcomingMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
