import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/top-rated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/tv-shows/top-rated"!</PageContainer>;
}
