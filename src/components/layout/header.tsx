import { HookedLogo } from "@/components/branding/hooked-logo";
import { DesktopMenu } from "@/components/navigation/desktop-menu";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { SearchDialog } from "@/features/search/components/search-dialog";
import { ThemeDropdown } from "@/features/theme/components/theme-dropdown";
import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function Header(props: ComponentProps<"header">) {
  return (
    <header
      {...props}
      className="sticky top-0 inset-x-0 z-50 border-b border-border/10 shadow-sm bg-background"
    >
      <div className="flex px-4 py-2 justify-between container mx-auto">
        <Link to="/">
          <HookedLogo className="h-8 w-auto text-foreground" />
        </Link>

        <div className="hidden lg:block">
          <DesktopMenu />
        </div>

        <div className="flex gap-2">
          <SearchDialog />
          <ThemeDropdown />
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
