import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
   /*server: {
    port: 3000,
  },*/
  base: './', // ¡Importante para que funcionen las rutas en móvil!
  build: {
    outDir: 'dist', // Asegúrate de que coincide con webDir en capacitor.config.ts
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-pdf', 'howler'],
  }
});