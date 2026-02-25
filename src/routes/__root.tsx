/// <reference types="vite/client" />
import { ThemeProvider } from "@/hooks/use-theme";
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
      },
    ],
    links: [{ rel: "stylesheet", href: styles }],
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
        <ThemeProvider activeTheme={activeTheme}>
          <Outlet />
        </ThemeProvider>
        <TanStackDevtools config={devtoolsConfig} plugins={devtoolsPlugins} />
        <Scripts />
      </body>
    </html>
  );
}
