import React from "react";

// Helpers
import { getIconURL } from "../helpers/getIconURL";

const RoundedButton = ({
  onClick,
  alt,
  icon,
  iconType = "outlined",
  hasShadow = false,
  tooltip = "",
}) => (
  <button
    className={`${
      hasShadow
        ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
        : ""
    }  relative group text-neutral-900 dark:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center justify-center h-12 w-12`}
    onClick={onClick}
  >
    <img className="icon" src={getIconURL(icon, iconType)} alt={alt} />
    {tooltip ? (
      <div className="z-50 absolute -bottom-12 text-sm shadow bg-white dark:bg-neutral-900 px-4 py-2 whitespace-nowrap rounded-lg hidden group-hover:block">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-b-8 border-r-8 border-l-transparent border-r-transparent border-b-white dark:border-b-neutral-900"></div>
        {tooltip}
      </div>
    ) : null}
  </button>
);

export default RoundedButton;
