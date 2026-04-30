import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path for GitHub Pages: https://<user>.github.io/Mentholove/
// Override at build time with `VITE_BASE=/SomeOther/ npm run build` if needed.
const base = process.env.VITE_BASE ?? '/Mentholove/';

export default defineConfig({
  base,
  plugins: [react()],
});
