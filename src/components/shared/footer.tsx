import { ComponentProps } from "react";

export function Footer(props: ComponentProps<"footer">) {
  return (
    <footer {...props}>
      <p>Footer</p>
    </footer>
  );
}
