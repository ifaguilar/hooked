import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const fetchUserData = createServerFn()
  .inputValidator(z.object({ movieId: z.string() }))
  .handler(async ({ data }) => {
    const response = await fetch(`${process.env.TMDB_API_BASE_URL}/movie/${data.movieId}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.json();
  });
