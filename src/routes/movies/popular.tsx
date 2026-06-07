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

export const Route = createFileRoute("/movies/popular")({
  component: PopularMoviesPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(movieQueries.popular(deps));
  },
});

function PopularMoviesPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Popular</TypographyH2>
        <Suspense fallback={<CardGridSkeleton />}>
          <PopularMoviesList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function PopularMoviesList() {
  const search = Route.useSearch();
  const { data: popularMovies } = useSuspenseQuery(movieQueries.popular(search));

  return (
    <>
      <CardGrid>
        {popularMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={popularMovies.page}
        totalPages={popularMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
