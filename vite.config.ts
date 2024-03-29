import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: 动态导入，减少打包体积
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/": {
        target: "https://bill.fadinglight.cn/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
  plugins: [react()]
})
