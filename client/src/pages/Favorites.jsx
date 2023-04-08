import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Heading from "../components/Heading";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import RoundedButton from "../components/RoundedButton";

// Constants
import { SERVER_BASE_URL } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthContext";

// Loaders
import { favoriteList as favoriteListLoader } from "../loaders/favoriteList";

const Favorites = () => {
  const { favoriteList, isTokenValid } = useLoaderData();
  const { isAuthenticated, logoutReason, logout } = useContext(AuthContext);
  const [movies, setMovies] = useState(favoriteList);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid) {
      logout("Session timeout");
    }
  }, []);

  const removeFromFavoriteList = async (movie) => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/user/favorites/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.ok) {
        const updatedMovies = await favoriteListLoader();
        setMovies(updatedMovies.favoriteList);

        toast.success(data.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "Unauthorized.") {
        logout("Session timeout");
      }

      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Navigate
          to="/login"
          state={{
            logoutReason: logoutReason,
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-32">
      <div className="min-h-[calc(100vh_-_208px)] flex flex-col gap-20">
        <Heading size="md">Favorites</Heading>
        {movies?.length > 0 ? (
          <MovieGrid>
            {movies.map((movie, index) => (
              <div key={index} className="relative">
                <MovieCard movie={movie} />
                <div className="absolute top-4 right-4">
                  <RoundedButton
                    alt="Remove from favorites"
                    onClick={
                      isAuthenticated
                        ? () => removeFromFavoriteList(movie)
                        : () => navigate("login")
                    }
                    icon="like"
                    iconType="filled"
                    hasShadow={true}
                    tooltip="Remove from favorites"
                  />
                </div>
              </div>
            ))}
          </MovieGrid>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 flex-grow text-center">
            <p>Your favorite list is empty.</p>
            <p>
              Try adding some items to your list by clicking the "
              <span className="font-bold">Add to Favorites</span>" button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
