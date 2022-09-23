import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.png'],
      manifest: {
        name: 'Reddit Reader',
        short_name: 'RedditReader',
        description: 'a reddit reader application that reads out reddit posts for you.',
        theme_color: '#212529',
        icons: [
          {
            src: 'appicon-192-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'appicon-512-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      } 
    })
  ],
});
