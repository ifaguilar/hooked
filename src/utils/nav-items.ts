import type { FileRouteTypes } from "@/routeTree.gen";
import { Film, Tv, Users, type LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href?: FileRouteTypes["to"];
  items?: NavItem[];
  icon?: LucideIcon;
};

export const navItems: readonly NavItem[] = [
  {
    title: "Movies",
    icon: Film,
    items: [
      { title: "Popular", href: "/movies/popular" },
      { title: "Now Playing", href: "/movies/now-playing" },
      { title: "Upcoming", href: "/movies/upcoming" },
      { title: "Top Rated", href: "/movies/top-rated" },
    ],
  },
  {
    title: "TV Shows",
    icon: Tv,
    items: [
      { title: "Popular", href: "/tv-shows/popular" },
      { title: "Airing Today", href: "/tv-shows/airing-today" },
      { title: "On TV", href: "/tv-shows/on-tv" },
      { title: "Top Rated", href: "/tv-shows/top-rated" },
    ],
  },
  {
    title: "People",
    icon: Users,
    items: [{ title: "Popular", href: "/people/popular" }],
  },
];
