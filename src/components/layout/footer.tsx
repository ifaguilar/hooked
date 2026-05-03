import { ComponentProps } from "react";

import { BrandLogo } from "@/components/branding/brand-logo";

export function Footer(props: ComponentProps<"footer">) {
  return (
    <footer
      {...props}
      className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-24"
    >
      <span className="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase opacity-50">
        Built by
      </span>
      {/* TODO: Add environment variable */}
      <a
        href="https://ifaguilar-personal-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <BrandLogo className="text-foreground h-8 w-auto" />
      </a>
    </footer>
  );
}
