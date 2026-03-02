/// <reference types="vite/client" />

// Client-side environment variables
interface ImportMetaEnv {
  readonly VITE_TMDB_IMAGE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly TMDB_API_BASE_URL: string;
      readonly TMDB_API_KEY: string;
    }
  }
}

export {};
