import { createServerOnlyFn } from "@tanstack/react-start";

export interface TMDBFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export const tmdbFetch = createServerOnlyFn(
  async <T>(path: string, options: TMDBFetchOptions = {}): Promise<T> => {
    const { params, ...requestOptions } = options;

    const url = new URL(`${process.env.TMDB_API_BASE_URL}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url, {
      ...requestOptions,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        ...requestOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    return response.json();
  },
);
