import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      hmr: mode === 'development' // ✅ only enable HMR in dev
    },
    build: {
      outDir: 'dist', // for production deployment
    },
  };
});
