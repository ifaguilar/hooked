import { SERVER_BASE_URL } from "../constants/constants";

export const upcomingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/api/movie/upcoming?page=${page}`
    );

    const data = await response.json();
    const movies = data.movies;
    const name = "Upcoming";

    return { movies, name };
  } catch (error) {
    console.error({ message: error.message });
  }
};
