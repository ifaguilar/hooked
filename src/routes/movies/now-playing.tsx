import { PageContainer } from "@/components/shared/page-container";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MovieCard,
  MovieCardSkeleton,
} from "@/features/movies/components/movie-card";
import { getNowPlayingMoviesQueryOptions } from "@/features/movies/utils/query-options";
import { MovieListParamsSchema } from "@/features/movies/utils/schemas";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/movies/now-playing")({
  component: RouteComponent,
  validateSearch: MovieListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(getNowPlayingMoviesQueryOptions(deps));
  },
});

function RouteComponent() {
  return (
    <PageContainer>
      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid />
        <MovieGridPagination />
      </Suspense>
    </PageContainer>
  );
}

export function MovieGrid() {
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(getNowPlayingMoviesQueryOptions(search));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function MovieGridPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
