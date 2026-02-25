import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app_layout/tv-shows/$tvShowId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tv-shows/$tvShowId"!</div>
}
