import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'img', dest: '' }]
    }),
    // Serve img/ directory in dev server
    {
      name: 'serve-img',
      configureServer(server) {
        server.middlewares.use('/img', (req, res, next) => {
          const filePath = path.join(process.cwd(), 'img', decodeURIComponent(req.url || ''))
          try {
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).slice(1).toLowerCase()
              const mimes = {
                webp: 'image/webp',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                svg: 'image/svg+xml',
              }
              res.setHeader('Content-Type', mimes[ext] || 'application/octet-stream')
              fs.createReadStream(filePath).pipe(res)
            } else {
              next()
            }
          } catch {
            next()
          }
        })
      },
    },
  ],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Split heavy animation libraries into their own chunks so app code
        // ships first and the libs cache independently across deploys.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('react-intersection-observer')) return 'intersection-observer'
            if (id.includes('react-dom') || id.includes('scheduler')) return 'react-dom'
            if (id.includes('react')) return 'react'
          }
        },
      },
    },
  },
})
