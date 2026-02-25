import hookedLogo from "@/assets/hooked-logo.svg";
import { DesktopNavigationMenu } from "@/components/shared/desktop-navigation-menu";
import { MobileNavigationMenu } from "@/components/shared/mobile-navigation-menu";
import { ThemeDropdown } from "@/components/shared/theme-dropdown";
import { SearchDialog } from "@/features/search/components/search-dialog";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function Header(props: ComponentProps<"header">) {
  return (
    <header {...props} className="flex p-3 justify-between">
      <Link to="/">
        <img src={hookedLogo} alt="Hooked" className="h-8" />
      </Link>

      <div className="hidden md:block">
        <DesktopNavigationMenu />
      </div>

      <div className="flex gap-2">
        <SearchDialog />
        <ThemeDropdown />
        <div className="md:hidden">
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
}
