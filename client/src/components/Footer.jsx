import React from "react";

// Components
import FooterLogo from "./FooterLogo";

// Constants
import { ATTRIBUTIONS } from "../constants/constants";

const Footer = () => (
  <div className="container mx-auto px-4 lg:px-8 py-16">
    <div className="flex flex-col gap-12 text-neutral-900/30 dark:text-white/30">
      {ATTRIBUTIONS.map((attribution) => (
        <div
          key={attribution.name}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span>{attribution.text}</span>
          <FooterLogo name={attribution.name} url={attribution.url} />
        </div>
      ))}
    </div>
  </div>
);

export default Footer;
