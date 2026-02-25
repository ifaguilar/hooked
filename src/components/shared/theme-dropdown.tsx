import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { THEME_VALUES, type Theme } from "@/utils/theme";
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

const THEME_LABEL: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const THEME_ICONS: Record<Theme, LucideIcon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

const THEMES = THEME_VALUES.map((value) => ({
  value,
  label: THEME_LABEL[value],
  icon: THEME_ICONS[value],
}));

export function ThemeDropdown() {
  const { activeTheme, setTheme } = useTheme();

  const ActiveIcon = THEME_ICONS[activeTheme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <ActiveIcon />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {THEMES.map((theme) => {
          const ThemeIcon = theme.icon;

          return (
            <DropdownMenuItem
              key={theme.value}
              onClick={() => setTheme(theme.value)}
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
