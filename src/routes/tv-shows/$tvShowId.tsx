import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "@/components/layout/page-container";

export const Route = createFileRoute("/tv-shows/$tvShowId")({
  component: RouteComponent,
});

function RouteComponent() {
  /* TODO: Fetch TV Show Data */
  return <PageContainer>Hello "/tv-shows/$tvShowId"!</PageContainer>;
}
