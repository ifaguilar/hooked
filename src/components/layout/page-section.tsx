import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export function PageSection({
  children,
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </section>
  );
}
