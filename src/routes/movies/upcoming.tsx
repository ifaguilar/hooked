import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/upcoming")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/movies/upcoming"!</div>;
}
