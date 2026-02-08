import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep a single vendor chunk for shared libs to avoid circular chunk
        // references between `ui` and `router` that can produce runtime errors
        // (see circular chunk: router -> ui -> router).
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            'lucide-react',
          ],
        },
      },
    },
  },
}));
