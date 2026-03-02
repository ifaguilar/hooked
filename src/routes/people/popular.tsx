import { PageContainer } from "@/components/shared/page-container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContainer>Hello "/people/popular"!</PageContainer>;
}
