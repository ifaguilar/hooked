import { SERVER_BASE_URL } from "../constants/constants";

export const favoriteList = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${SERVER_BASE_URL}/api/user/favorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.ok) {
      return {
        isTokenValid: true,
        favoriteList: data.favoriteList,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error({ message: error.message });
    return {
      isTokenValid: false,
    };
  }
};
