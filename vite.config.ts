import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { inspectAttr } from "kimi-plugin-inspect-react"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: "./",
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})