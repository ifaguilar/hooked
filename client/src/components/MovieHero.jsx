import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import RoundedButton from "./RoundedButton";
import Heading from "./Heading";
import Pill from "./Pill";
import Rating from "./Rating";

// Constants
import { SERVER_BASE_URL } from "../constants/constants";

// Context
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

// Helpers
import { getImageURL } from "../helpers/getImageURL";

// Utils
import { toHoursAndMinutes, getFullDate } from "../utils/DateTime";

const MovieHero = ({ movie, director }) => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const genres = useRouteLoaderData("app").genres;

  const [movieGenres, setMovieGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInFavoriteList, setIsInFavoriteList] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const backgroundRef = useCallback(
    (node) => {
      if (node !== null) {
        {
          movie.backdrop_path
            ? (node.style.backgroundImage = `url(${getImageURL(
                "original",
                movie.backdrop_path
              )}`)
            : theme === "light"
            ? (node.style.backgroundColor = "#ffffff")
            : (node.style.backgroundColor = "#0a0a0a");
        }
      }
    },
    [theme]
  );

  useEffect(() => {
    let preloaderImage = document.createElement("img");

    preloaderImage.src = getImageURL("original", movie.backdrop_path);

    preloaderImage.addEventListener("load", (event) => {
      setIsLoading(false);
      preloaderImage = null;
    });

    return () => removeEventListener("load", preloaderImage);
  }, []);

  useEffect(() => {
    filterGenres();
  }, [movie.genre_ids]);

  const filterGenres = () => {
    const movieGenres = genres.filter((genre) =>
      movie.genres.some(
        (movieGenre) => JSON.stringify(genre) === JSON.stringify(movieGenre)
      )
    );

    setMovieGenres(movieGenres);
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkFavoriteList(movie.id);
      checkWatchlist(movie.id);
    }
  }, []);

  const addToFavoriteList = async () => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/user/favorites/${movie.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.ok) {
        setIsInFavoriteList(true);
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
        console.error(error.message);
        toast.error("Your session has expired. Please, log in again.", {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      } else {
        console.error(error.message);
        toast.error(error.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      }
    }
  };

  const addToWatchlist = async () => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/api/user/watchlist/${movie.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.ok) {
        setIsInWatchlist(true);
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
        console.error(error.message);
        toast.error("Your session has expired. Please, log in again.", {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      } else {
        console.error(error.message);
        toast.error(error.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      }
    }
  };

  const removeFromFavoriteList = async () => {
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
        setIsInFavoriteList(false);
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
        console.error(error.message);
        toast.error("Your session has expired. Please, log in again.", {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      } else {
        console.error(error.message);
        toast.error(error.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      }
    }
  };

  const removeFromWatchlist = async () => {
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
        setIsInWatchlist(false);
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
        console.error(error.message);
        toast.error("Your session has expired. Please, log in again.", {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      } else {
        console.error(error.message);
        toast.error(error.message, {
          position: "bottom-right",
          className:
            "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
        });
      }
    }
  };

  const checkFavoriteList = async (movieId) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/user/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.ok) {
        const result = data.favoriteList.some((movie) => movie.id === movieId);
        setIsInFavoriteList(result);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "Unauthorized.") {
        logout("Session timeout");
      }

      console.error({ message: error.message });
      toast.error(error.message, {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }
  };

  const checkWatchlist = async (movieId) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/user/watchlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.ok) {
        const result = data.watchlist.some((movie) => movie.id === movieId);
        setIsInWatchlist(result);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "Unauthorized.") {
        logout("Session timeout");
      }

      console.error({ message: error.message });
      toast.error(error.message, {
        position: "bottom-right",
        className:
          "text-neutral-950 dark:text-white bg-white dark:bg-neutral-900",
      });
    }
  };

  return (
    <div className="relative min-h-screen mt-[60px]">
      <div
        className={`absolute inset-0 h-[85vh] bg-fixed bg-cover bg-no-repeat bg-center transition ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        ref={backgroundRef}
      >
        <div className="backdrop-blur-md absolute inset-0 bg-gradient-to-t from-white to-white/10 dark:from-neutral-950 dark:to-neutral-950/10"></div>
      </div>
      <div className="relative w-full h-full container mx-auto px-4 lg:px-8 py-32">
        <div className="flex flex-col gap-12 lg:grid lg:gap-24 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <div className="aspect-[2/3] w-2/3 md:w-1/2 lg:w-full mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-md">
              {movie.poster_path ? (
                <img
                  className="w-full h-full object-cover"
                  src={getImageURL("w500", movie.poster_path)}
                  alt={movie.title}
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800"></div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <Heading size="lg">{movie.title}</Heading>
              {movie.tagline && (
                <p className="italic text-lg">"{movie.tagline}"</p>
              )}
            </div>
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                <Rating
                  voteAverage={movie.vote_average || 0}
                  releaseDate={movie.release_date}
                />
                <span className="font-semibold">User Score</span>
              </div>
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                {isInFavoriteList ? (
                  <RoundedButton
                    onClick={
                      isAuthenticated
                        ? removeFromFavoriteList
                        : () => navigate("login")
                    }
                    alt="Remove from favorites"
                    icon="like"
                    iconType="filled"
                    hasShadow={true}
                    tooltip="Remove from favorites"
                  />
                ) : (
                  <RoundedButton
                    alt="Add to favorites"
                    onClick={
                      isAuthenticated
                        ? addToFavoriteList
                        : () => navigate("/login")
                    }
                    icon="like"
                    hasShadow={true}
                    tooltip={
                      isAuthenticated
                        ? "Add to favorites"
                        : "Log in to add this movie to your favorite list"
                    }
                  />
                )}
                {isInWatchlist ? (
                  <RoundedButton
                    alt="Remove from watchlist"
                    onClick={
                      isAuthenticated
                        ? removeFromWatchlist
                        : () => navigate("/login")
                    }
                    icon="bookmark-ribbon--v1"
                    iconType="filled"
                    hasShadow={true}
                    tooltip="Remove from watchlist"
                  />
                ) : (
                  <RoundedButton
                    alt="Add to watchlist"
                    onClick={
                      isAuthenticated
                        ? addToWatchlist
                        : () => navigate("/login")
                    }
                    icon="bookmark-ribbon--v1"
                    hasShadow={true}
                    tooltip={
                      isAuthenticated
                        ? "Add to watchlist"
                        : "Log in to add this movie to your watchlist"
                    }
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Heading size="md">Overview</Heading>
              <p>{movie?.overview || "No overview found."}</p>
            </div>
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
              <div className="flex flex-col gap-4">
                <Heading size="md">Details</Heading>
                <ul className="flex flex-col gap-4">
                  <li>Director: {director?.name || "Unknow"}</li>
                  <li>Duration: {toHoursAndMinutes(movie.runtime)}</li>
                  <li>Release Date: {getFullDate(movie.release_date)}</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <Heading size="md">Genres</Heading>
                <div className="flex gap-4 items-center flex-wrap">
                  {movieGenres.length !== 0 ? (
                    movieGenres.map((genre) => {
                      return <Pill key={genre.id}>{genre.name}</Pill>;
                    })
                  ) : (
                    <div>
                      <p>No genres found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
