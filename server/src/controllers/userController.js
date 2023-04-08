// Controllers
import { fetchMovieDetails } from "./movieController.js";

// Models
import { User } from "../models/userModel.js";

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "User details retrieved successfully.",
      userDetails: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        location: user.location,
        gender: user.gender,
        birthDate: user.birthDate,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const updatePersonalInfo = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const { name, location, gender, birthDate } = req.body;

    user.name = name;
    user.location = location;
    user.gender = gender;
    user.birthDate = birthDate;

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Personal info updated successfully.",
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const updateSecurity = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const { email, password } = req.body;

    const emailInUse = await User.findOne({ email }).select("email");

    if (emailInUse) {
      return res.status(409).json({
        ok: false,
        message: "Email is already in use.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.email = email;
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Security updated successfully.",
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    await User.findByIdAndDelete(user._id);

    return res.status(200).json({
      ok: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getFavoriteList = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const favoriteList = await Promise.all(
      user.favoriteList.map((movieId) => fetchMovieDetails(movieId))
    );

    return res.status(200).json({
      ok: true,
      message: "Favorite list retrieved successfully.",
      favoriteList: favoriteList,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const watchlist = await Promise.all(
      user.watchlist.map((movieId) => fetchMovieDetails(movieId))
    );

    return res.status(200).json({
      ok: true,
      message: "Watchlist retrieved successfully.",
      watchlist: watchlist,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const addToFavoriteList = async (req, res) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const isInFavoriteList = user.favoriteList.includes(parseInt(movieId));

    if (isInFavoriteList) {
      return res.status(400).json({
        ok: false,
        message: "Movie is already in your favorite list.",
      });
    }

    user.favoriteList.push(movieId);
    await user.save();

    const favoriteList = user.favoriteList;

    return res.status(200).json({
      ok: true,
      message: "Movie added to your favorite list successfully.",
      favoriteList: favoriteList,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const isInWatchlist = user.watchlist.includes(parseInt(movieId));

    if (isInWatchlist) {
      return res.status(400).json({
        ok: false,
        message: "Movie is already in your watchlist.",
      });
    }

    user.watchlist.push(movieId);
    await user.save();

    const watchlist = user.watchlist;

    return res.status(200).json({
      ok: true,
      message: "Movie added to your watchlist successfully.",
      watchlist: watchlist,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const removeFromFavoriteList = async (req, res) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const movieIndex = user.favoriteList.indexOf(movieId);

    if (movieIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: "Movie is not in your favorite list.",
      });
    }

    user.favoriteList.splice(movieIndex, 1);
    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Movie removed from your favorite list successfully.",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user;
    const movieId = req.params.movieId;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User does not exists.",
      });
    }

    const movieIndex = user.watchlist.indexOf(movieId);

    if (movieIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: "Movie is not in your watchlist.",
      });
    }

    user.watchlist.splice(movieIndex, 1);
    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Movie removed from your watchlist successfully.",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
