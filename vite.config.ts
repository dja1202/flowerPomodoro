import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// Dynamic import for ESM-only Tailwind plugin
export default defineConfig(async () => {
  const tailwindcss = await import('@tailwindcss/vite').then(m => m.default);
  
  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],

    // Electron-specific configuration
    base: './',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  };
})