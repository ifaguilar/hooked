import mongoose from "mongoose";
import { defaultAvatars } from "../constants/defaultAvatars.js";
import { getRandomItem } from "../utils/getRandomItem.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: () => {
        return getRandomItem(defaultAvatars);
      },
    },
    favoriteList: [
      {
        type: Number,
        required: true,
      },
    ],
    watchlist: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
