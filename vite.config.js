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
        name: "sekre-web",
        short_name: "sekre-web",
        start_url: "/",
        display: "standalone",
        lang: "en",
        scope: "/",
        background_color: "white",
        theme_color: "#FFFFFF",
        icons: [

        ]
      }
    }),
    react()
  ],
}
)
