import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import z from "zod";

export type ThemeValue = "light" | "dark" | "system";

export type ThemeOption = {
  value: ThemeValue;
  label: string;
  icon: LucideIcon;
};

export const THEME_OPTIONS: readonly ThemeOption[] = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
];

export const THEME_STORAGE_KEY = "theme";

export const themeSchema = z.enum(THEME_OPTIONS.map((theme) => theme.value));

export const getThemeServerFn = createServerFn().handler(() => {
  const parsed = themeSchema.safeParse(getCookie(THEME_STORAGE_KEY));
  return parsed.success ? parsed.data : themeSchema.enum.system;
});

export const setThemeServerFn = createServerFn()
  .inputValidator(themeSchema)
  .handler(({ data: newTheme }) => setCookie(THEME_STORAGE_KEY, newTheme));
