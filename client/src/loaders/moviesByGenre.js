import { SERVER_BASE_URL } from "../constants/constants";

export const moviesByGenre = async ({ params }, page = 1) => {
  const genreName = params.genreName;
  const genres = JSON.parse(localStorage.getItem("genres"));

  const result = genres.filter((genre) => {
    return genre.name.toLowerCase().replace(" ", "-") === genreName;
  });

  const genreId = result[0].id;

  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/api/discover/movie/genre/${genreId}?page=${page}`
    );

    const data = await response.json();
    const movies = data.movies;
    const name = result[0].name;

    return { movies, name };
  } catch (error) {
    console.error({ message: error.message });
  }
};
