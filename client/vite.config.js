import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env variables from .env files
  const env = loadEnv(mode, new URL(".", import.meta.url).pathname);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL, // from .env file
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
