import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Outlet,
  useLoaderData,
  ScrollRestoration,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Components
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Context
import { ThemeContext } from "./context/ThemeContext";

// Helpers
import { darkModePreference, toggleDarkMode } from "./helpers/darkMode";

const App = () => {
  const { genres } = useLoaderData();
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);

  const [sidebarOpen, setSidebarOpen] = useState();
  const [menuOpen, setMenuOpen] = useState();
  const [themeOpen, setThemeOpen] = useState();
  const [themeIcon, setThemeIcon] = useState();

  const overlayRef = useRef();
  let location = useLocation();

  useEffect(() => {
    localStorage.setItem("genres", JSON.stringify(genres));
  }, []);

  useEffect(() => {
    darkModePreference.addEventListener("change", () =>
      setThemeIcon(toggleDarkMode())
    );

    return () => {
      darkModePreference.removeEventListener(
        "change",
        setThemeIcon(toggleDarkMode())
      );
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOverlay);

    return () => {
      document.removeEventListener("click", handleOverlay);
    };
  }, []);

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
    setThemeIcon(toggleDarkMode());
  }, [theme]);

  const handleOverlay = (event) => {
    const isClickInside = overlayRef.current.contains(event.target);

    if (isClickInside) {
      closeAllMenus();
    }
  };

  const closeAllMenus = () => {
    setSidebarOpen(false);
    setMenuOpen(false);
    setThemeOpen(false);
  };

  return (
    <div className="relative min-h-screen font-medium bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white">
      {navigation.state === "loading" && <Spinner position="fixed" />}
      <div
        ref={overlayRef}
        className={`${
          sidebarOpen || themeOpen || menuOpen ? "block" : "hidden"
        } absolute inset-0 z-40`}
      ></div>
      <Navbar
        isSidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isThemeOpen={themeOpen}
        setThemeOpen={setThemeOpen}
        themeIcon={themeIcon}
        isMenuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        closeAllMenus={closeAllMenus}
      />
      <Sidebar
        genres={genres}
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Outlet key={location.key} />
      <Footer />
      <ScrollRestoration />
      <ToastContainer />
    </div>
  );
};

export default App;
