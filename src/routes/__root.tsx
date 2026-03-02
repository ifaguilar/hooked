/// <reference types="vite/client" />
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { devtoolsConfig } from "@/lib/tanstack-devtools/devtools-config";
import { devtoolsPlugins } from "@/lib/tanstack-devtools/devtools-plugins";
import styles from "@/styles.css?url";
import { getThemeServerFn } from "@/utils/theme";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
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
      // Twitter
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
  loader: () => getThemeServerFn(),
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
        <div className="flex flex-col min-h-svh">
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
