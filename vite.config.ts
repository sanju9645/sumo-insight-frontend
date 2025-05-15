import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: 'prompt' as const,
  includeAssets: ['favicon.ico', "apple-touch-icon.png", "masked-icon.png"],
  manifest: {
    name: "Sumo Insight",
    short_name: "Sumo Insight",
    description: "Turning raw API data into actionable intelligence",
    icons: [{
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon'
    },
    {
      src: '/maskable-icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    }],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: "standalone" as const,
    scope: '/',
    start_url: "/",
  }
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
})
