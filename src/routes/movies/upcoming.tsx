import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/upcoming")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/upcoming"!</PageContainer>;
}
