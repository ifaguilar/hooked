import React from "react";

// Helpers
import { getIconURL } from "../helpers/getIconURL";

const SearchBox = ({ setSearchTerm }) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 left-0 w-[60px] h-[60px] flex items-center justify-center opacity-[0.31] dark:opacity-40">
          <img className="icon" src={getIconURL("search--v1")} alt="Search" />
        </div>
        <input
          className="w-full px-[60px] py-4 rounded-full border-2 border-neutral-900/10 dark:border-white/10 bg-white dark:bg-neutral-900 placeholder-neutral-900/40 dark:placeholder-white/40 focus:outline-none hover:border-neutral-900/40 dark:hover:border-white/40 focus:border-neutral-900 dark:focus:border-white"
          placeholder="Search for movies"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchBox;
