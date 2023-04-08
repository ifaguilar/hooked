import { SERVER_BASE_URL } from "../constants/constants";

export const movieDetails = async ({ params }) => {
  const movieId = params.movieId;

  try {
    let response = await fetch(`${SERVER_BASE_URL}/api/movie/${movieId}`);
    let data = await response.json();
    const movie = data.movie;

    response = await fetch(`${SERVER_BASE_URL}/api/movie/${movieId}/credits`);
    data = await response.json();
    const cast = data.cast;
    const crew = data.crew;

    response = await fetch(`${SERVER_BASE_URL}/api/movie/${movieId}/videos`);
    data = await response.json();
    const videos = data.videos;

    response = await fetch(
      `${SERVER_BASE_URL}/api/movie/${movieId}/recommendations`
    );
    data = await response.json();
    const recommendations = data.recommendations;

    return { movie, cast, crew, videos, recommendations };
  } catch (error) {
    console.error({ message: error.message });
  }
};
