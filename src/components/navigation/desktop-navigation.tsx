import { Link } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/utils/nav-items";

export function DesktopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => {
          const ItemIcon = item.icon;

          if (item.items && item.items.length > 0) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>
                  {ItemIcon ? <ItemIcon className="mr-2 size-4" /> : null}
                  <span>{item.title}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex min-w-40 flex-col gap-1">
                  {item.items.map((subItem) => (
                    <NavigationMenuLink
                      key={subItem.href}
                      render={
                        <Link
                          to={subItem.href!}
                          activeProps={{
                            "data-active": true,
                          }}
                        >
                          {subItem.title}
                        </Link>
                      }
                    />
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          if (item.href) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link
                      to={item.href}
                      activeProps={{
                        "data-active": true,
                      }}
                    >
                      {ItemIcon ? <ItemIcon className="mr-2 size-4" /> : null}
                      <span>{item.title}</span>
                    </Link>
                  }
                />
              </NavigationMenuItem>
            );
          }

          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
