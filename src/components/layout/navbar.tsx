import { ThemeDropdown } from "@/components/shared/theme-dropdown";
import { ComponentProps } from "react";

export function Navbar(props: ComponentProps<"nav">) {
  return (
    <nav {...props}>
      <p>Navbar</p>
      <ThemeDropdown />
    </nav>
  );
}
