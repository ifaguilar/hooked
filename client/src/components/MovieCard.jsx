import React from "react";
import { Link } from "react-router-dom";

// Components
import Rating from "./Rating";

// Helpers
import { getImageURL } from "../helpers/getImageURL";

const MovieCard = ({ movie }) => {
  const date = new Date(movie.release_date);
  const releaseYear = date.getFullYear();

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative block w-full rounded-2xl overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-800"
    >
      {movie.poster_path ? (
        <img
          className="w-full h-full object-cover"
          src={getImageURL("w500", movie.poster_path)}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800"></div>
      )}
      <div className="absolute top-0 left-0 right-0 bottom-0 translate-y-6 hover:translate-y-0 flex items-end p-4 bg-gradient-to-t from-white dark:from-neutral-950 opacity-0 hover:opacity-100 transition">
        <div className="flex flex-col gap-4 font-semibold">
          <Rating
            voteAverage={movie.vote_average || 0}
            releaseDate={movie.release_date}
          />
          <span>{releaseYear || "Unknow"}</span>
          <h3>{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
