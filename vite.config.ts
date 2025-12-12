/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/coco.ts"),
      name: "coco",
      fileName: "taksim-coco",
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
    },
  },
});
