import { useLoaderData } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";
import { ComponentProps, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setTheme,
  THEME_OPTIONS,
  ThemeValue,
} from "@/features/theme/utils/theme";

export function ThemeDropdown(props: ComponentProps<typeof DropdownMenu>) {
  const initialTheme = useLoaderData({
    from: "__root__",
  });

  const [activeTheme, setActiveTheme] = useState(initialTheme);

  const ActiveIcon =
    THEME_OPTIONS.find((t) => t.value === activeTheme)?.icon ||
    THEME_OPTIONS[0].icon;

  async function handleThemeChange(theme: ThemeValue) {
    setActiveTheme(theme);
    document.documentElement.className = theme;
    await setTheme({ data: theme });
  }

  return (
    <DropdownMenu {...props} modal={false}>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Toggle theme">
            <ActiveIcon />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        {THEME_OPTIONS.map((theme) => {
          const ThemeIcon = theme.icon;

          return (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
            >
              <ThemeIcon />
              <span className="flex-1">{theme.label}</span>
              {theme.value === activeTheme ? (
                <CheckIcon className="size-4" />
              ) : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
