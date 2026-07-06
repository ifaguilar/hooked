import { fileURLToPath, URL } from "url";

import netlify from "@netlify/vite-plugin-tanstack-start";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tanstackStart(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    netlify(),
  ],
});

export default config;
