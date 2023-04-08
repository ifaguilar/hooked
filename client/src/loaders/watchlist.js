import { SERVER_BASE_URL } from "../constants/constants";

export const watchlist = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/user/watchlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.ok) {
      return {
        isTokenValid: true,
        watchlist: data.watchlist,
        count: data.count,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error({ message: error.message });
    return {
      isTokenValid: false,
      watchlist: null,
    };
  }
};
