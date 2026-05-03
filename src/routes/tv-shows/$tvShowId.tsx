import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "@/components/layout/page-container";

export const Route = createFileRoute("/tv-shows/$tvShowId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/tv-shows/$tvShowId"!</PageContainer>;
}
