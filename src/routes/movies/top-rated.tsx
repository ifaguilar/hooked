import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CardGrid, CardGridSkeleton } from "@/components/layout/card-grid";
import { ListPagination } from "@/components/layout/list-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { MediaCard } from "@/features/media/components/media-card";
import { movieQueries } from "@/features/movies/api/queries";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";

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
        <Suspense fallback={<CardGridSkeleton />}>
          <TopRatedMoviesList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function TopRatedMoviesList() {
  const search = Route.useSearch();
  const { data: topRatedMovies } = useSuspenseQuery(movieQueries.topRated(search));

  return (
    <>
      <CardGrid>
        {topRatedMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={topRatedMovies.page}
        totalPages={topRatedMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
