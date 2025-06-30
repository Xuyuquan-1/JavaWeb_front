import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  base: '/vitetestapp/',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        test: resolve(__dirname, 'serialtest.html'),
        admin: resolve(__dirname, 'admin.html')
      },
    },
  }
})
