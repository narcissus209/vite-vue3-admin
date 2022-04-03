import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { plugins } from './viteConfig'

const resolve = (src: string) => path.resolve(__dirname, src)

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())
  console.log(viteEnv)
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      //css预处理
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/common.scss";'
        }
      }
    },
    plugins: plugins(viteEnv),
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: false,
      proxy: {
        [`^${viteEnv.VITE_API_BASE}`]: {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
