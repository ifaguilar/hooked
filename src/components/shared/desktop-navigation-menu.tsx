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
import { Link } from "@tanstack/react-router";

export function DesktopNavigationMenu() {
  return (
    <NavigationMenu viewport={false}>
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
                <NavigationMenuContent className="flex min-w-32 flex-col gap-1">
                  {item.items.map((subItem) => (
                    <NavigationMenuLink key={subItem.href} asChild>
                      <Link
                        to={subItem.href!}
                        activeProps={{
                          "data-active": true,
                        }}
                      >
                        {subItem.title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          if (item.href) {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    to={item.href}
                    activeProps={{
                      "data-active": true,
                    }}
                  >
                    {ItemIcon ? <ItemIcon className="mr-2 size-4" /> : null}
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
