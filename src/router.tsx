import { ErrorComponent } from "@/lib/tanstack-router/components/error-component";
import { NotFoundComponent } from "@/lib/tanstack-router/components/not-found-component";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    scrollRestoration: true,
  });

  return router;
}
