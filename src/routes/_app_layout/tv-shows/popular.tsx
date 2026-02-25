import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/tv-shows/popular')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tv-shows/popular"!</div>
}
