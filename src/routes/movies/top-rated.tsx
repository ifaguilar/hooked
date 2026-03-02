import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/top-rated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/top-rated"!</PageContainer>;
}
