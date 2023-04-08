import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

// Components
import Heading from "../components/Heading";
import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MovieGrid";
import SearchBox from "../components/SearchBox";
import Spinner from "../components/Spinner";

// Constants
import { SERVER_BASE_URL } from "../constants/constants";

const Search = () => {
  const { movies } = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchMovies = async (encodedSearchTerm) => {
    const body = {
      encodedSearchTerm,
    };

    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/search/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.movies) {
        setResults(data.movies);
      } else {
        setResults([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error({ message: error.message });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (searchTerm === "") {
      setResults([]);
    } else {
      const delaySearch = setTimeout(() => {
        const encodedSearchTerm = encodeURI(searchTerm);

        searchMovies(encodedSearchTerm);
      }, 1000);

      return () => clearTimeout(delaySearch);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-32">
      <div className="min-h-[calc(100vh_-_208px)] flex flex-col gap-20">
        <SearchBox setSearchTerm={setSearchTerm} />
        {searchTerm ? (
          isLoading ? (
            <div className="relative flex-grow">
              <Spinner position="absolute" />
            </div>
          ) : results.length > 0 ? (
            <>
              <Heading size="md">Results for "{searchTerm}"</Heading>
              <MovieGrid>
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </MovieGrid>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 flex-grow text-center">
              <p>
                Your search for "<span className="font-bold">{searchTerm}</span>
                " did not have any matches.
              </p>
              <p>Try searching for something else.</p>
            </div>
          )
        ) : (
          <>
            <Heading size="md">Popular Searches</Heading>
            <MovieGrid>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </MovieGrid>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
