import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/movies/now-playing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movies/now-playing"!</div>
}
