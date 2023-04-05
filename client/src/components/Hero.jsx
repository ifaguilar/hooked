import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";

// Components
import Button from "./Button";
import Heading from "./Heading";
import Pill from "./Pill";
import Rating from "./Rating";

// Context
import { ThemeContext } from "../context/ThemeContext";

// Helpers
import { getImageURL } from "../helpers/getImageURL";

// Utils
import { truncateString } from "../utils/truncateString";

const Hero = ({ movie }) => {
  const { theme } = useContext(ThemeContext);

  const genres = useRouteLoaderData("app").genres;

  const [movieGenres, setMovieGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const movieGenres = genres.filter((genre) => {
      return movie.genre_ids.includes(genre.id);
    });

    setMovieGenres(movieGenres);
  };

  return (
    <div className="relative min-h-screen mt-[60px]">
      <div
        className={`absolute inset-0 h-[85vh] bg-fixed bg-cover bg-no-repeat bg-center transition ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        ref={backgroundRef}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950"></div>
      </div>
      <div className="absolute inset-0 h-[90vh] flex items-end container mx-auto px-4 lg:px-8 py-32">
        <div className="flex flex-col gap-12 max-w-prose">
          <Heading size="lg">{movie.title}</Heading>
          <div className="flex gap-4 items-center">
            <Rating
              voteAverage={movie.vote_average || 0}
              releaseDate={movie.release_date}
            />
            {movieGenres &&
              movieGenres.map((genre, index) => {
                if (index < 2) {
                  return <Pill key={genre.id}>{genre.name}</Pill>;
                }
              })}
          </div>
          <p>{truncateString(movie.overview)}</p>
          <div>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="primary">Learn more</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
