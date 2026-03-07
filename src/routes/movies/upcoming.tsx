import { PageContainer } from "@/components/shared/page-container";
import { getUpcomingMoviesQueryOptions } from "@/features/movies/utils/query-options";
import { MovieListParamsSchema } from "@/features/movies/utils/schemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/upcoming")({
  component: RouteComponent,
  validateSearch: MovieListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(getUpcomingMoviesQueryOptions(deps));
  },
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/upcoming"!</PageContainer>;
}
