import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/people/popular"!</div>;
}
