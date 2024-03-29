import React from "react";

const Input = ({ touched, error, ...props }) => {
  return (
    <input
      className={`w-full px-6 py-[14px] rounded-md bg-white dark:bg-neutral-950 placeholder-neutral-400 dark:placeholder-neutral-500 border-2 border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500 focus:outline-none focus:border-neutral-950 dark:focus:border-white ${
        touched && error
          ? `
            border-red-600 dark:border-red-600 
            hover:border-red-500 dark:hover:border-red-500
            focus:bg-transparent dark:focus:bg-transparent focus:border-red-600 dark:focus:border-red-600"
            `
          : ""
      }`}
      {...props}
    />
  );
};

export default Input;
