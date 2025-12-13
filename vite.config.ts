/// <reference types="vitest" />
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/coco.ts"),
      name: "coco",
      fileName: "taksim-coco",
      formats: ["es", "umd", "cjs"],
    },
    minify: true,
    sourcemap: true,
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
