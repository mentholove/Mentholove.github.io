import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works at any URL:
//  - opened directly as a file (file://.../dist/index.html)
//  - served from a sub-path (https://user.github.io/Repo/)
//  - served from a domain root (https://user.github.io/)
// Override at build time with `VITE_BASE=/SomePath/ npm run build` if needed.
const base = process.env.VITE_BASE ?? './';

export default defineConfig({
  base,
  plugins: [react()],
});
