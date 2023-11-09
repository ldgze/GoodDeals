import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://gooddeals.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

// target: "http://localhost:3000",
