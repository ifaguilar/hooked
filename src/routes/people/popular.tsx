import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "@/components/layout/page-container";

export const Route = createFileRoute("/people/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/people/popular"!</PageContainer>;
}
