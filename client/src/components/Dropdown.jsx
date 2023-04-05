import React from "react";

const Dropdown = ({ children, isOpen }) => (
  <div
    className={`${
      isOpen ? "block" : "hidden"
    } absolute w-64 z-50 top-[60px] right-0 py-4 rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-neutral-900`}
  >
    {children}
  </div>
);

export default Dropdown;
