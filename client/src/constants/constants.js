export const serverBaseURL = import.meta.env.VITE_SERVER_BASE_URL;

export const youtubeBaseURL = "https://www.youtube.com/embed/";

export const websitePerspectiveBg =
  "https://res.cloudinary.com/dz0brhzsu/image/upload/v1678337967/hooked/website-perspective.png";

export const imagesBaseURL = "https://image.tmdb.org/t/p";

export const outlinedIconsBaseURL =
  "https://img.icons8.com/fluency-systems-regular";

export const filledIconsBaseURL =
  "https://img.icons8.com/fluency-systems-filled";

export const themeOptions = [
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

export const categories = [
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

export const categoryIcons = {
  popular: "popcorn",
  "top-rated": "star--v1",
  upcoming: "calendar--v1",
};

export const genreIcons = {
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

export const attributions = [
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
