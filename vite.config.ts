import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/bun";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    honox(),
    devServer({
      adapter,
      entry: "app/server.ts",
    }),
    tailwindcss(),
  ],
});
