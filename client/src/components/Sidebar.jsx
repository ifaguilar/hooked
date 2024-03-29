import React from "react";
import { NavLink } from "react-router-dom";

// Components
import MenuHeading from "./MenuHeading";
import MenuItem from "./MenuItem";
import Separator from "./Separator";

// Constants
import {
  CATEGORIES,
  CATEGORY_ICONS,
  GENRE_ICONS,
} from "../constants/constants";

const Sidebar = ({ genres, isOpen, setSidebarOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } fixed top-[60px] bottom-0 left-0 w-64 z-50 py-8 overflow-y-scroll shadow-lg bg-white dark:bg-neutral-900 transition`}
    >
      <MenuHeading>Categories</MenuHeading>
      {CATEGORIES.map((category) => {
        const categoryName = category.name.toLowerCase().replace(" ", "-");

        return (
          <NavLink
            to={category.link}
            key={category.id}
            onClick={() => setSidebarOpen(false)}
          >
            {({ isActive }) => (
              <MenuItem
                text={category.name}
                icon={CATEGORY_ICONS[categoryName]}
                isActive={isActive}
              />
            )}
          </NavLink>
        );
      })}
      <Separator />
      <MenuHeading>Genres</MenuHeading>
      {genres.map((genre) => {
        const genreName = genre.name.toLowerCase().replace(" ", "-");

        return (
          <NavLink
            to={`/genre/${genreName}`}
            key={genre.id}
            onClick={() => setSidebarOpen(false)}
          >
            {({ isActive }) => (
              <MenuItem
                icon={GENRE_ICONS[genreName]}
                text={genre.name}
                isActive={isActive}
              />
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
