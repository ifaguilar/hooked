import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tv-shows/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tv-shows/popular"!</div>;
}
