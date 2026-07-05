import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getTheme } from "@/features/theme/utils/theme";
import { devtoolsConfig } from "@/lib/tanstack-devtools/devtools-config";
import { devtoolsPlugins } from "@/lib/tanstack-devtools/devtools-plugins";

import styles from "@/styles.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Hooked",
        name: "description",
        content: "",
      },
      {
        name: "keywords",
        content: "",
      },

      // Open Graph
      { property: "og:title", content: "" },
      { property: "og:description", content: "" },
      { property: "og:image", content: "" },
      { property: "og:type", content: "website" },

      // X (Twitter)
      { name: "twitter:title", content: "" },
      { name: "twitter:description", content: "" },
      { name: "twitter:image", content: "" },
      { name: "twitter:card", content: "" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  loader: () => getTheme(),
  component: RootComponent,
});

function RootComponent() {
  const activeTheme = Route.useLoaderData();

  return (
    <html lang="en" className={activeTheme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-svh flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <TanStackDevtools config={devtoolsConfig} plugins={devtoolsPlugins} />
        <Scripts />
      </body>
    </html>
  );
}
