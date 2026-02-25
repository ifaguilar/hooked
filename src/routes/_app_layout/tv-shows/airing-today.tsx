import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/tv-shows/airing-today')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app_layout/tv-shows/airing-today"!</div>
}
