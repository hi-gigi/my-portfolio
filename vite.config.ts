import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev serves from "/"; the production build is served from the GitHub
// Pages project path https://<user>.github.io/my-portfolio/.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/my-portfolio/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
