import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/movies/popular')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movies/popular"!</div>
}
