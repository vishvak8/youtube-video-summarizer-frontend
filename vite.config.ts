import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify output directory
    sourcemap: true, // Include source maps for easier debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Aliases '@' to the 'src' folder for simpler imports
    },
  },
  server: {
    port: 5173, // Development server port
    open: true, // Automatically open in the browser
  },
});
