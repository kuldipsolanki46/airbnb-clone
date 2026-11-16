import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Dev-only: forward API calls to the Java (Spring Boot) backend.
    proxy: { '/api': 'http://localhost:8080' },
  },
});
