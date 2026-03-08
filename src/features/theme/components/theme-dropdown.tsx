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
import { useLoaderData, useRouter } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function ThemeDropdown(props: ComponentProps<typeof DropdownMenu>) {
  const router = useRouter();

  const activeTheme = useLoaderData({
    from: "__root__",
  });

  const ActiveIcon =
    THEME_OPTIONS.find((t) => t.value === activeTheme)?.icon ||
    THEME_OPTIONS[0].icon;

  async function handleThemeChange(theme: ThemeValue) {
    await setTheme({ data: theme });
    router.invalidate();
  }

  return (
    <DropdownMenu {...props} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <ActiveIcon />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {THEME_OPTIONS.map((theme) => {
          const ThemeIcon = theme.icon;

          return (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
            >
              <ThemeIcon />
              <span>{theme.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
