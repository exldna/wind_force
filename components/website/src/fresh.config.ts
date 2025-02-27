import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  build: {
    outDir: "../_fresh",
  },
  staticDir: "../static",
  plugins: [tailwind()],
});
