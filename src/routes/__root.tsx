/// <reference types="vite/client" />
import { devtoolsConfig } from "@/lib/tanstack-devtools/utils/devtools-config";
import { devtoolsPlugins } from "@/lib/tanstack-devtools/utils/devtools-plugins";
import { RootDocument } from "@/lib/tanstack-router/components/root-document";
import styles from "@/styles.css?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";

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
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <TanStackDevtools config={devtoolsConfig} plugins={devtoolsPlugins} />
    </RootDocument>
  );
}
