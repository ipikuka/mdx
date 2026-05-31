import { defineConfig } from "vite";

/// <reference types="vitest" />
export default defineConfig({
  test: {
    include: ["tests/**/*.spec.tsx"],
    coverage: {
      provider: "v8",
      reporter: [
        ["lcov", { projectRoot: "./src" }], //
        ["json", { file: "coverage.json" }],
        "text",
      ],
      include: ["src/rsc.tsx", "src/serialize.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
