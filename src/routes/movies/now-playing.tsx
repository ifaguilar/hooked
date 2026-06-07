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

export const Route = createFileRoute("/movies/now-playing")({
  component: NowPlayingMoviesPage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(movieQueries.nowPlaying(deps));
  },
});

function NowPlayingMoviesPage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Now Playing</TypographyH2>
        <Suspense fallback={<CardGridSkeleton />}>
          <NowPlayingMoviesList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function NowPlayingMoviesList() {
  const search = Route.useSearch();
  const { data: nowPlayingMovies } = useSuspenseQuery(movieQueries.nowPlaying(search));

  return (
    <>
      <CardGrid>
        {nowPlayingMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={nowPlayingMovies.page}
        totalPages={nowPlayingMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
