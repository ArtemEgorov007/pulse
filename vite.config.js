import {fileURLToPath, URL} from 'node:url'
import {copyFileSync} from 'node:fs'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production'
const base = isProd ? '/pulse/' : '/'

// GitHub Pages is a static host with no SPA fallback, so a hard refresh on a
// client-side route (e.g. /pulse/posts) 404s. Emitting 404.html as a copy of
// index.html lets Pages serve the SPA shell for any unknown path.
const outDir = 'dist'
const spaPagesFallback = {
    name: 'spa-pages-fallback',
    closeBundle() {
        copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`)
    }
}

// https://vite.dev/config/
export default defineConfig({
    base,
    plugins: [
        vue(),
        spaPagesFallback,
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        open: true,
        port: 3000
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    }
})