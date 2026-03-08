import { BrandLogo } from "@/components/branding/brand-logo";
import { ComponentProps } from "react";

export function Footer(props: ComponentProps<"footer">) {
  return (
    <footer
      {...props}
      className="container mx-auto px-4 py-24 flex flex-col items-center justify-center gap-4"
    >
      <span className="text-muted-foreground text-xs uppercase font-bold tracking-[0.2em] opacity-50">
        Built by
      </span>
      {/* TODO: Add environment variable */}
      <a
        href="https://ifaguilar-personal-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <BrandLogo className="h-8 w-auto text-foreground" />
      </a>
    </footer>
  );
}
