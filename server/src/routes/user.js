import { Router } from "express";
import {
  getUserDetails,
  getFavoriteList,
  getWatchlist,
  addToFavoriteList,
  addToWatchlist,
  removeFromFavoriteList,
  removeFromWatchlist,
  updatePersonalInfo,
  updateSecurity,
  deleteAccount,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getUserDetails);

router.get("/favorites", verifyToken, getFavoriteList);
router.get("/watchlist", verifyToken, getWatchlist);

router.post("/favorites/:movieId", verifyToken, addToFavoriteList);
router.post("/watchlist/:movieId", verifyToken, addToWatchlist);

router.patch("/personal-info", verifyToken, updatePersonalInfo);
router.patch("/security", verifyToken, updateSecurity);

router.delete("/account", verifyToken, deleteAccount);
router.delete("/favorites/:movieId", verifyToken, removeFromFavoriteList);
router.delete("/watchlist/:movieId", verifyToken, removeFromWatchlist);

export default router;
