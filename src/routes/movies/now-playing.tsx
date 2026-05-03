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
        <Suspense fallback={<MediaGridSkeleton />}>
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
      <MediaGrid>
        {nowPlayingMovies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} type="movie" />
        ))}
      </MediaGrid>
      <MediaPagination
        currentPage={nowPlayingMovies.page}
        totalPages={nowPlayingMovies.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
