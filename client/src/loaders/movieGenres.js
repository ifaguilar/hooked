import { SERVER_BASE_URL } from "../constants/constants";

export const movieGenres = async () => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/genre/`);

    return response.json();
  } catch (error) {
    console.error({ message: error.message });
  }
};
