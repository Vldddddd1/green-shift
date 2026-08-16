/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  server: {
    fs: {
      allow: ['..'],
    },
    watch: {
      usePolling: true,
      interval: 100,
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['../tests/frontend/setupTests.ts'],
    include: ['../tests/frontend/**/*.{test,spec}.{ts,tsx}'],
  },
})
