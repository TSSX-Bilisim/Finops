import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const devPort = parseInt(process.env.DEV_PORT_WEB || '3000', 10);
const prodPort = parseInt(process.env.PROD_PORT_WEB || '4000', 10);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: devPort,
    host: '0.0.0.0'
  },
  preview: {
    port: prodPort
  }
});
