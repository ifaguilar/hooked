import { useRouter } from "@tanstack/react-router";
import { createContext, type PropsWithChildren, use } from "react";
import { setThemeServerFn, type Theme } from "@/utils/theme";

type ThemeContextValue = {
  activeTheme: Theme;
  setTheme: (newTheme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = PropsWithChildren<{ activeTheme: Theme }>;

export function ThemeProvider({ children, activeTheme }: ThemeProviderProps) {
  const router = useRouter();

  async function setTheme(newTheme: Theme) {
    if (activeTheme === newTheme) return;

    await setThemeServerFn({ data: newTheme });
    router.invalidate();
  }

  return (
    <ThemeContext value={{ activeTheme, setTheme }}>{children}</ThemeContext>
  );
}

export function useTheme() {
  const value = use(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}
