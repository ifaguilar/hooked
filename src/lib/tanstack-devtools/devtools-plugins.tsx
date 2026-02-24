import { TanStackDevtoolsReactInit } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export const devtoolsPlugins: TanStackDevtoolsReactInit["plugins"] = [
  {
    name: "TanStack Router",
    render: <TanStackRouterDevtoolsPanel />,
    defaultOpen: false,
  },
];
