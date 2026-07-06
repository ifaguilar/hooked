import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export function PageContainer({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "container mx-auto p-4 flex flex-col gap-16 py-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
