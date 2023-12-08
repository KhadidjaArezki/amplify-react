import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("amplify-"),
        },
      },
    })],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis", //<-- AWS SDK 
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: "./runtimeConfig", replacement: "./runtimeConfig.browser"
      },
      {
        find: '@', replacement: path.resolve(__dirname, './src'),
      }
    ],
  },
})
