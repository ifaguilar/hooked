import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/movies/$movieId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movies/$movieId"!</div>
}
