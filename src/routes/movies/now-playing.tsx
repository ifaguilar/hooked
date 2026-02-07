import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movies/now-playing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movies/now-playing"!</div>
}
