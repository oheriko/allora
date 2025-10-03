import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/bun";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [
        honox({
          client: { input: ["/app/client.ts", "/app/style.css"] },
        }),
        tailwindcss(),
      ],
      build: {
        outDir: "./dist/static",
        emptyOutDir: false,
        rollupOptions: {
          input: ["/app/client.ts"],
          output: {
            entryFileNames: "static/[name]-[hash].js",
            assetFileNames: "static/[name]-[hash].[ext]",
          },
        },
      },
    };
  } else {
    return {
      plugins: [
        honox(),
        devServer({
          adapter,
          entry: "app/server.ts",
        }),
        tailwindcss(),
      ],
      ssr: {
        external: ["hono"],
      },
      build: {
        ssr: true,
        outDir: "./dist",
        rollupOptions: {
          input: "./app/server.ts",
          output: {
            entryFileNames: "[name].js",
          },
        },
      },
    };
  }
});
