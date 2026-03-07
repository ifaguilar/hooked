import { PageContainer } from "@/components/shared/page-container";
import { getTopRatedMoviesQueryOptions } from "@/features/movies/utils/query-options";
import { MovieListParamsSchema } from "@/features/movies/utils/schemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/top-rated")({
  component: RouteComponent,
  validateSearch: MovieListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(getTopRatedMoviesQueryOptions(deps));
  },
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/top-rated"!</PageContainer>;
}
