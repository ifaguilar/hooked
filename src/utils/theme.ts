import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

export const THEME_STORAGE_KEY = "theme";

export const THEME_VALUES = ["light", "dark", "system"] as const;

export const themeSchema = z.enum(THEME_VALUES);

export type Theme = z.infer<typeof themeSchema>;

export const getThemeServerFn = createServerFn().handler(() => {
  const parsed = themeSchema.safeParse(getCookie(THEME_STORAGE_KEY));
  return parsed.success ? parsed.data : themeSchema.enum.system;
});

export const setThemeServerFn = createServerFn()
  .inputValidator(themeSchema)
  .handler(({ data }) => setCookie(THEME_STORAGE_KEY, data));
