import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ["@mlc-ai/web-llm"]
  }
});
