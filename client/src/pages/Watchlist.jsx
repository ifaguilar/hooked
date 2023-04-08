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
import { watchlist as watchlistLoader } from "../loaders/watchlist";

const Watchlist = () => {
  const { watchlist, count, isTokenValid } = useLoaderData();
  const { isAuthenticated, logoutReason, logout } = useContext(AuthContext);
  const [movies, setMovies] = useState(watchlist);
  const [counter, setCounter] = useState(count);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid) {
      logout("Session timeout");
    }
  }, []);

  const removeFromWatchlist = async (movie) => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/user/watchlist/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.ok) {
        const updatedMovies = await watchlistLoader();
        setMovies(updatedMovies.watchlist);
        setCounter(counter - 1);

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
        <Heading size="md">{`Watchlist (${counter})`}</Heading>
        {movies?.length > 0 ? (
          <MovieGrid>
            {movies.map((movie, index) => (
              <div key={index} className="relative">
                <MovieCard movie={movie} />
                <div className="absolute top-4 right-4">
                  <RoundedButton
                    alt="Remove from watchlist"
                    onClick={
                      isAuthenticated
                        ? () => removeFromWatchlist(movie)
                        : () => navigate("login")
                    }
                    icon="bookmark-ribbon--v1"
                    iconType="filled"
                    hasShadow={true}
                    tooltip="Remove from watchlist"
                  />
                </div>
              </div>
            ))}
          </MovieGrid>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 flex-grow text-center">
            <p>Your watchlist is empty.</p>
            <p>
              Try adding some items to your list by clicking the "
              <span className="font-bold">Add to Watchlist</span>" button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
