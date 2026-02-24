import { ComponentProps } from "react";

export function PageWrapper({ children, ...props }: ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}
