import React from "react";

// Helpers
import { getIconURL } from "../helpers/getIconURL";

const Select = ({ options, ...props }) => {
  return (
    <div className="relative">
      <div className="z-10 absolute top-0 right-0 w-[60px] h-[60px] flex items-center justify-center pointer-events-none opacity-[0.36] dark:opacity-[0.55]">
        <img
          className="icon"
          src={getIconURL("expand-arrow--v1", "outlined", "16")}
          alt="Expand"
        />
      </div>
      <select
        className="w-full px-6 py-[14px] rounded-md appearance-none bg-white dark:bg-neutral-950 placeholder-neutral-400 dark:placeholder-neutral-500 border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white"
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.name}
            value={option.value}
            className="text-neutral-950 dark:text-white"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
