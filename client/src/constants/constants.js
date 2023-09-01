export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";

export const WEBSITE_PERSPECTIVE_BG =
  "https://res.cloudinary.com/ifaguilar/image/upload/v1680726353/hooked/website-perspective.png";

export const IMAGES_BASE_URL = "https://image.tmdb.org/t/p";

export const OUTLINED_ICONS_BASE_URL =
  "https://img.icons8.com/fluency-systems-regular";

export const FILLED_ICONS_BASE_URL =
  "https://img.icons8.com/fluency-systems-filled";

export const GENDER_OPTIONS = [
  {
    name: "Select a gender",
    value: "",
  },
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
];

export const THEME_OPTIONS = [
  {
    name: "Light",
    icon: "sun",
  },
  {
    name: "Dark",
    icon: "crescent-moon",
  },
  {
    name: "System",
    icon: "monitor--v1",
  },
];

export const CATEGORIES = [
  {
    id: 1,
    name: "Popular",
    link: "/",
  },
  {
    id: 2,
    name: "Top Rated",
    link: "/top-rated",
  },
  {
    id: 3,
    name: "Upcoming",
    link: "/upcoming",
  },
];

export const CATEGORY_ICONS = {
  popular: "popcorn",
  "top-rated": "star--v1",
  upcoming: "calendar--v1",
};

export const GENRE_ICONS = {
  action: "action",
  adventure: "adventure",
  animation: "animation",
  comedy: "comedy",
  crime: "crime",
  documentary: "documentary",
  drama: "drama",
  family: "children-faces",
  fantasy: "fantasy",
  history: "historical",
  horror: "horror",
  music: "musical",
  mystery: "detective",
  romance: "novel",
  "science-fiction": "sci-fi",
  "tv-movie": "retro-tv",
  thriller: "thriller",
  war: "battle",
  western: "western",
};

export const ATTRIBUTIONS = [
  {
    name: "tmdb",
    url: "https://themoviedb.org",
    text: "Powered by",
  },
  {
    name: "icons8",
    url: "https://icons8.com",
    text: "Icons by",
  },
  {
    name: "portfolio",
    url: "https://github.com/ifaguilar",
    text: "Built & Designed by",
  },
];
