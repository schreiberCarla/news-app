import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/news-app/',
    server: {
        proxy: {
            "/api": {
                target: "https://gnews.io",
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(/^\/api/, "/api/v4"),
            },
        },
    },
})
