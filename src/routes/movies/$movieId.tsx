import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$movieId")({
  component: RouteComponent,
});

function RouteComponent() {
  /* TODO: Fetch Movie Data */
  return <div>Hello "/movies/$movieId"!</div>;
}
