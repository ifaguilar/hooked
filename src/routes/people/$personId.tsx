import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "@/components/layout/page-container";

export const Route = createFileRoute("/people/$personId")({
  component: RouteComponent,
});

function RouteComponent() {
  /* TODO: Fetch Person Data */
  return <PageContainer>Hello "/people/$personId"!</PageContainer>;
}
