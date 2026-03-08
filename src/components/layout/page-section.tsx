import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

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
