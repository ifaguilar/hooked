import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/tv-shows/on-tv')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app_layout/tv-shows/on-tv"!</div>
}
