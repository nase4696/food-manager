import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/*.stories.*"],
    setupFiles: ["src/test/vitest.setup.ts"],
    server: {
      deps: {
        inline: ["next", "next-auth"],
      },
    },
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/navigation": "next/navigation.js",
      "next/server": "next/server.js",
    },
  },
});
