import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/airing-today")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tv-shows/airing-today"!</div>;
}
