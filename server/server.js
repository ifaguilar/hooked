import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRouter from "./src/routes/auth.js";
import discoverRouter from "./src/routes/discover.js";
import genreRouter from "./src/routes/genre.js";
import movieRouter from "./src/routes/movie.js";
import searchRouter from "./src/routes/search.js";
import trendingRouter from "./src/routes/trending.js";
import userRouter from "./src/routes/user.js";

import { connectDB } from "./src/database/db.js";

// Functions
dotenv.config();
connectDB();

// Variables
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/discover", discoverRouter);
app.use("/api/genre", genreRouter);
app.use("/api/movie", movieRouter);
app.use("/api/search", searchRouter);
app.use("/api/trending", trendingRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
