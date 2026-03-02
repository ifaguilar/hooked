import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/popular"!</PageContainer>;
}
