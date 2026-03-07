import { PageContainer } from "@/components/shared/page-container";
import { getPopularMoviesQueryOptions } from "@/features/movies/utils/query-options";
import { MovieListParamsSchema } from "@/features/movies/utils/schemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/popular")({
  component: RouteComponent,
  validateSearch: MovieListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(getPopularMoviesQueryOptions(deps));
  },
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/popular"!</PageContainer>;
}
