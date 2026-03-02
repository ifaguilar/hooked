import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function TypographyH1({ children, className }: ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-4xl font-semibold tracking-tight text-balance", className)}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-3xl font-semibold tracking-tight text-balance", className)}>
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: ComponentProps<"h3">) {
  return (
    <h3 className={cn("text-2xl font-semibold tracking-tight text-balance", className)}>
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className }: ComponentProps<"h4">) {
  return (
    <h4 className={cn("text-xl font-semibold tracking-tight text-balance", className)}>
      {children}
    </h4>
  );
}
