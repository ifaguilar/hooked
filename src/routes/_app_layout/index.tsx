import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app_layout/")({
  component: HomePage,
});

function HomePage() {
  return <p>Home Page</p>;
}
