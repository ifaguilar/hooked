import React from "react";

const Button = ({
  variant,
  children,
  onClick,
  type = "button",
  disabled = false,
}) => (
  <button
    className={`${
      variant === "primary"
        ? "bg-red-600 text-white hover:brightness-90"
        : "text-neutral-900 dark:text-white bg-white dark:bg-neutral-900 hover:brightness-90 dark:hover:bg-neutral-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]"
    }  drop-shadow uppercase text-sm inline-flex gap-2 items-center justify-center rounded-md font-semibold px-6 py-[14px] disabled:opacity-50`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
