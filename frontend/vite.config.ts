/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'

const apiProxy = {
  '/api':{
        target: process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
  }
}

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
    proxy: apiProxy,
    fs: {
      allow: ['..'],
    },
    watch: {
      usePolling: true,
      interval: 100,
    }
  },
  preview:{
    allowedHosts: ["epilogue-chihuahua-dramatize.ngrok-free.dev"],
    proxy: apiProxy
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['../tests/frontend/setupTests.ts'],
    include: ['../tests/frontend/**/*.{test,spec}.{ts,tsx}'],
  },
})
