import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

export function PageContainer({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("container mx-auto p-4 flex flex-col gap-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
