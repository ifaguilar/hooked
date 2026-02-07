import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tv-shows/top-rated')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tv-shows/top-rated"!</div>
}
