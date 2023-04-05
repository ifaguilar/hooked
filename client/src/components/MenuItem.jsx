import React from "react";

// Helpers
import { getIconURL } from "../helpers/getIconURL";

const MenuItem = ({ icon, text, isActive = false, onClick = null }) => (
  <div
    className={`${
      isActive ? "active" : ""
    } flex items-center gap-4 p-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800`}
    onClick={onClick}
  >
    <img className="icon" src={getIconURL(icon)} alt="Icon" />
    <span>{text}</span>
  </div>
);

export default MenuItem;
