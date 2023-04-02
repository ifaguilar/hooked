import React from "react";

const Input = ({ touched, error, ...props }) => {
  return (
    <input
      className={`w-full px-6 py-[14px] rounded-md border-2 border-neutral-900/10 dark:border-white/10 bg-white dark:bg-neutral-900 placeholder-neutral-900/40 dark:placeholder-white/40 focus:outline-none hover:border-neutral-900/40 dark:hover:border-white/40 focus:border-neutral-900 dark:focus:border-white ${
        touched && error
          ? "border-red-600 dark:border-red-600 bg-red-600/5 dark:bg-red-600/5 hover:bg-transparent dark:hover:bg-transparent placeholder-red-600/60 dark:placeholder-red-600/60 hover:border-red-600 dark:hover:border-red-600 focus:bg-transparent dark:focus:bg-transparent focus:border-red-600 dark:focus:border-red-600"
          : ""
      }`}
      {...props}
    />
  );
};

export default Input;
