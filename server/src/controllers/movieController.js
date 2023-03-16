import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export const fetchMovieDetails = async (movieId) => {
  const endpoint = `/movie/${movieId}`;

  const response = await fetch(
    `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`
  );

  const data = await response.json();

  const movie = {
    id: data.id,
    title: data.title,
    poster_path: data.poster_path,
    vote_average: data.vote_average,
    release_date: data.release_date,
    overview: data.overview,
    backdrop_path: data.backdrop_path,
    runtime: data.runtime,
    tagline: data.tagline,
    genres: data.genres,
  };
  return movie;
};

export const getDetails = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const data = await fetchMovieDetails(movieId);

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      movie: data,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getPopular = async (req, res) => {
  try {
    const page = req.query.page;
    const endpoint = "/movie/popular";

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      movies: data.results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getTopRated = async (req, res) => {
  try {
    const page = req.query.page;
    const endpoint = "/movie/top_rated";

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      movies: data.results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getUpcoming = async (req, res) => {
  try {
    const page = req.query.page;
    const endpoint = "/movie/upcoming";

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      movies: data.results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getCredits = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const endpoint = `/movie/${movieId}/credits`;

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      cast: data.cast,
      crew: data.crew,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getVideos = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const endpoint = `/movie/${movieId}/videos`;

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      videos: data.results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const endpoint = `/movie/${movieId}/recommendations`;

    const response = await fetch(
      `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.status_code === 7) {
      return res.status(401).json({
        ok: false,
        message: data.status_message,
      });
    }

    if (data.status_code === 34) {
      return res.status(404).json({
        ok: false,
        message: data.status_message,
      });
    }

    return res.status(200).json({
      ok: true,
      recommendations: data.results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
