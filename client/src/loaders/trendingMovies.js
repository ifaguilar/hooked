import { SERVER_BASE_URL } from "../constants/constants";

export const trendingMovies = async () => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/trending/`);

    return response.json();
  } catch (error) {
    console.error({ message: error.message });
  }
};
