import { ErrorComponent } from "@/components/shared/error-component";
import { NotFoundComponent } from "@/components/shared/not-found-component";
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
