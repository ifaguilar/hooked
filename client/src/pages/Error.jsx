import React, { useContext, useEffect } from "react";
import { useRouteError, Link } from "react-router-dom";

// Components
import Button from "../components/Button";

// Context
import { ThemeContext } from "../context/ThemeContext";

// Helpers
import { darkModePreference, toggleDarkMode } from "../helpers/darkMode";

const Error = () => {
  const error = useRouteError();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    switch (theme) {
      case "light":
        localStorage.setItem("theme", "light");
        break;
      case "dark":
        localStorage.setItem("theme", "dark");
        break;
      case "system":
        localStorage.removeItem("theme");
        break;
    }
    toggleDarkMode();
  }, [theme]);

  useEffect(() => {
    darkModePreference.addEventListener("change", toggleDarkMode);

    return () => {
      darkModePreference.removeEventListener("change", toggleDarkMode);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950">
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
          Oops!
        </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {error.status ? (
          <>
            <p>Error code: {`${error.status} ${error.statusText}`}</p>
            <Link to="/">
              <Button variant="primary">Go to Home</Button>
            </Link>
          </>
        ) : (
          <p>Error code: 500 Internal Server Error</p>
        )}
      </div>
    </div>
  );
};

export default Error;
