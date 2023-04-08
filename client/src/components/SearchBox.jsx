import React from "react";

// Helpers
import { getIconURL } from "../helpers/getIconURL";

const SearchBox = ({ setSearchTerm }) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-lg">
        <div className="z-50 absolute top-0 left-0 w-[60px] h-[60px] flex items-center justify-center pointer-events-none opacity-[0.36] dark:opacity-[0.55]">
          <img className="icon" src={getIconURL("search")} alt="Search" />
        </div>
        <input
          className="w-full px-[60px] py-4 rounded-full bg-white dark:bg-neutral-950 placeholder-neutral-400 dark:placeholder-neutral-500 border-2 border-neutral-300 dark:border-neutral-600 focus:outline-none hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-neutral-950 dark:focus:border-white"
          placeholder="Search for movies"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchBox;
