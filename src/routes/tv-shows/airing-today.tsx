import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/airing-today")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/tv-shows/airing-today"!</PageContainer>;
}
