import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/now-playing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/movies/now-playing"!</PageContainer>;
}
