import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev serves from "/"; the production build is served from the GitHub
// Pages project path https://<user>.github.io/my-portfolio/.
// Honour a PORT assigned by the environment (e.g. the Claude Code
// preview runner); fall back to Vite's default 5173 for a bare `npm run dev`.
const devPort = process.env.PORT ? Number(process.env.PORT) : undefined;

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/my-portfolio/" : "/",
  plugins: [react()],
  server: { port: devPort },
  css: {
    preprocessorOptions: {
      // Strict math: only evaluate arithmetic inside parens. Keeps
      // authored CSS like `clamp(1rem, 1rem + 3vw, 2.5rem)` verbatim
      // instead of collapsing `1rem + 3vw` to `4rem` at build time.
      less: { math: "parens" },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
