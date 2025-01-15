import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-electron-file",
      writeBundle() {
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }
        fs.copyFileSync(
          resolve(process.cwd(), "public", "electron.js"),
          resolve(process.cwd(), "dist", "electron.js")
        );
      },
    },
  ],
  base: "./", // Ensure assets use relative paths
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["react-bootstrap", "bootstrap"],
          utils: ["axios", "socket.io-client", "uuid"],
        },
      },
    },
  },
});
