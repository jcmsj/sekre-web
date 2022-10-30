import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Sekre",
        short_name: "Sekre",
        start_url: "/",
        display: "standalone",
        lang: "en",
        scope: "/",
        background_color: "white",
        theme_color: "#FFFFFF",
        icons: [
          {
            "src": "/sekre.webp",
            "sizes": "1024x1024",
            "type": "image/webp"
          },
          {
            "src": "/sekre-opaque.png",
            "sizes": "1024x1024",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/sekre-transparent.png",
            "sizes": "1024x1024",
            "type": "image/png",
          },
          {
            "src": "/favicon.png",
            "sizes": "196x196",
          }
        ]
      }
    }),
    react()
  ],
}
)
