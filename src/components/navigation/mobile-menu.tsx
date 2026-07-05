import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { HookedLogo } from "@/components/branding/hooked-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/utils/nav-items";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activeItem = navItems.find((item) =>
    item.items?.some(
      (subItem) => subItem.href && location.pathname.startsWith(subItem.href),
    ),
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Open navigation menu"
          >
            <MenuIcon />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        }
      />

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for the website
          </SheetDescription>

          <Link to="/" onClick={() => setIsOpen(false)}>
            <HookedLogo className="text-foreground h-8 w-auto" />
          </Link>
        </SheetHeader>

        <div className="flex flex-col gap-2 px-4">
          <Accordion
            className="flex w-full flex-col gap-2"
            defaultValue={[activeItem?.title]}
          >
            {navItems.map((item, index) => {
              const showSeparator = index < navItems.length - 1;
              const ItemIcon = item.icon;

              if (item.items && item.items.length > 0) {
                return (
                  <Fragment key={item.title}>
                    <AccordionItem value={item.title} className="border-b-0">
                      <AccordionTrigger className="py-3 text-base font-semibold hover:no-underline">
                        <div className="flex items-center gap-2">
                          {ItemIcon ? <ItemIcon className="size-5" /> : null}
                          <span>{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2 pb-2 pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={subItem.href!}
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground py-1.5 text-sm font-medium transition-colors"
                            activeProps={{
                              className: "text-foreground font-semibold",
                            }}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    {showSeparator ? <Separator /> : null}
                  </Fragment>
                );
              }

              if (item.href) {
                return (
                  <Fragment key={item.title}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-foreground/80 flex w-full items-center gap-2 py-3 text-base font-semibold transition-colors"
                      activeProps={{
                        className: "text-foreground",
                      }}
                    >
                      {ItemIcon ? <ItemIcon className="size-5" /> : null}
                      <span>{item.title}</span>
                    </Link>
                    {showSeparator ? <Separator /> : null}
                  </Fragment>
                );
              }

              return (
                <Fragment key={item.title}>
                  {showSeparator ? <Separator /> : null}
                </Fragment>
              );
            })}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
