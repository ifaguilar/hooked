import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

// Components
import Avatar from "./Avatar";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import MenuHeading from "./MenuHeading";
import MenuItem from "./MenuItem";
import RoundedButton from "./RoundedButton";
import Separator from "./Separator";

// Constants
import { themeOptions } from "../constants/constants";

// Context
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({
  isSidebarOpen,
  setSidebarOpen,
  isThemeOpen,
  setThemeOpen,
  themeIcon,
  isMenuOpen,
  setMenuOpen,
  closeAllMenus,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = (menuName = null) => {
    closeAllMenus();

    switch (menuName) {
      case "sidebar":
        setSidebarOpen(!isSidebarOpen);
        break;
      case "theme":
        setThemeOpen(!isThemeOpen);
        break;
      case "menu":
        setMenuOpen(!isMenuOpen);
        break;
      default:
        break;
    }
  };

  const themeDropdown = () => {
    return (
      <Dropdown isOpen={isThemeOpen}>
        <MenuHeading>Change Theme</MenuHeading>

        {themeOptions.map((option) => (
          <MenuItem
            key={option.name}
            icon={option.icon}
            text={option.name}
            isActive={theme === option.name.toLowerCase()}
            onClick={() => setTheme(option.name.toLowerCase())}
          />
        ))}
      </Dropdown>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-4 py-[6px] shadow-lg bg-white dark:bg-neutral-900">
      <div className="flex items-center gap-4">
        <RoundedButton
          onClick={() => handleClick("sidebar")}
          icon="menu--v1"
          alt="Sidebar"
        />

        <Logo onClick={handleClick} />
      </div>

      <div className="flex items-center gap-4">
        <Link to="/search" onClick={handleClick}>
          <RoundedButton icon="search" alt="Search" />
        </Link>

        {isAuthenticated ? (
          <div className="relative">
            <Avatar src={user.avatar} onClick={() => handleClick("menu")} />

            <Dropdown isOpen={isMenuOpen}>
              <Link to="/settings">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={handleClick}
                >
                  <Avatar src={user.avatar} />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-medium">{user.name}</span>
                    <span className="text-small">{user.email}</span>
                  </div>
                </div>
              </Link>

              <Separator />

              <NavLink to="/favorites">
                {({ isActive }) => (
                  <MenuItem
                    icon={"hearts"}
                    text="Favorites"
                    onClick={handleClick}
                    isActive={isActive}
                  />
                )}
              </NavLink>

              <NavLink to="/watchlist">
                {({ isActive }) => (
                  <MenuItem
                    icon={"bookmark-ribbon--v1"}
                    text="Watchlist"
                    onClick={handleClick}
                    isActive={isActive}
                  />
                )}
              </NavLink>

              <Separator />

              <MenuItem
                icon={themeIcon === "dark" ? "crescent-moon" : "sun"}
                text="Change Theme"
                onClick={() => handleClick("theme")}
              />

              <Separator />

              <MenuItem
                icon={"exit"}
                text="Log out"
                onClick={() => {
                  handleClick();
                  logout();
                }}
              />
            </Dropdown>

            {themeDropdown()}
          </div>
        ) : (
          <>
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <div className="relative">
                <RoundedButton
                  onClick={() => handleClick("theme")}
                  icon={themeIcon === "dark" ? "crescent-moon" : "sun"}
                  alt={themeIcon === "dark" ? "Dark" : "Light"}
                />

                {themeDropdown()}
              </div>

              <Link to="/login">
                <Button variant="primary">Sign In</Button>
              </Link>
            </div>

            <div className="relative lg:hidden">
              <RoundedButton
                onClick={() => handleClick("menu")}
                icon="menu-2--v1"
                alt="Menu"
              />

              <Dropdown isOpen={isMenuOpen}>
                <Link to="/login" className="flex flex-col px-4">
                  <Button variant="primary">Sign In</Button>
                </Link>

                <Separator />

                <MenuItem
                  icon={themeIcon === "dark" ? "crescent-moon" : "sun"}
                  text="Change Theme"
                  onClick={() => handleClick("theme")}
                />
              </Dropdown>

              {themeDropdown()}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
