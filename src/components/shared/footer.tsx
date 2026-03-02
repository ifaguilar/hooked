import { IsaacAguilarLogo } from "@/components/shared/isaac-aguilar-logo";
import { ComponentProps } from "react";

export function Footer(props: ComponentProps<"footer">) {
  return (
    <footer
      {...props}
      className="container mx-auto px-4 py-24 flex flex-col items-center justify-center gap-2"
    >
      <span className="text-muted-foreground text-xs uppercase font-semibold">Built by</span>
      <a
        href="https://ifaguilar-personal-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IsaacAguilarLogo className="h-8 w-auto text-foreground" />
      </a>
    </footer>
  );
}
