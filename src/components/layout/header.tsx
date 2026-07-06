import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import { HookedLogo } from "@/components/branding/hooked-logo";
import { DesktopNavigation } from "@/components/navigation/desktop-navigation";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { SearchDialog } from "@/features/search/components/search-dialog";
import { ThemeDropdown } from "@/features/theme/components/theme-dropdown";

export function Header(props: ComponentProps<"header">) {
  return (
    <header
      {...props}
      className="border-border/10 bg-background sticky inset-x-0 top-0 z-50 border-b shadow-sm"
    >
      <div className="container mx-auto flex justify-between px-4 py-2">
        <Link to="/">
          <HookedLogo className="text-foreground h-8 w-auto" />
        </Link>

        <div className="hidden lg:block">
          <DesktopNavigation />
        </div>

        <div className="flex gap-2">
          <SearchDialog />
          <ThemeDropdown />
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
