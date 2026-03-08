import { RouterError } from "@/components/router-states/router-error";
import { RouterNotFound } from "@/components/router-states/router-not-found";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

export function getRouter() {
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultErrorComponent: RouterError,
    defaultNotFoundComponent: RouterNotFound,
    defaultViewTransition: true,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
