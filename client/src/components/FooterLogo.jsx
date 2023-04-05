import React from "react";

// Assets
import { ReactComponent as TMDB } from "../assets/tmdb-logo.svg";
import { ReactComponent as Icons8 } from "../assets/icons8-logo.svg";
import { ReactComponent as Portfolio } from "../assets/isaac-aguilar-logo.svg";

const FooterLogo = ({ name, url }) => (
  <a href={url} target="_blank">
    {name === "tmdb" ? (
      <TMDB className="logo" />
    ) : name === "icons8" ? (
      <Icons8 className="logo text-[#1a1a1a] dark:text-white" />
    ) : (
      <Portfolio className="logo text-neutral-900 dark:text-white" />
    )}
  </a>
);

export default FooterLogo;
