import { DesktopNavigationMenu } from "@/components/shared/desktop-navigation-menu";
import { HookedLogo } from "@/components/shared/hooked-logo";
import { MobileNavigationMenu } from "@/components/shared/mobile-navigation-menu";
import { ThemeDropdown } from "@/components/shared/theme-dropdown";
import { SearchDialog } from "@/features/search/components/search-dialog";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function Header(props: ComponentProps<"header">) {
  return (
    <header {...props} className="flex px-4 py-2 justify-between container mx-auto z-10">
      <Link to="/">
        <HookedLogo className="h-8 w-auto text-foreground" />
      </Link>

      <div className="hidden lg:block">
        <DesktopNavigationMenu />
      </div>

      <div className="flex gap-2">
        <SearchDialog />
        <ThemeDropdown />
        <div className="lg:hidden">
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
}
